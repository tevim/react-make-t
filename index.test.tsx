/* global describe, expect, it */
import { mount } from 'enzyme'
import * as React from 'react'

import { createI18nContext } from './index'

interface IOutterProps {
  name: string
}

describe('I18nProvider and translated', () => {
  describe('integration', () => {
    describe('when locale and keys are strings', () => {
      type Locale = string

      const makeT = (locale: Locale) => (
        locale === 'de' ?
          ((key: string) => key === 'welcome' ? 'Herzlich willkommen' : 'NOOOOOOOOOOOOOOOO') :
          // tslint:disable-next-line:variable-name
          ((_key: string) => 'NOOOOOOOOOOOOOOOO')
      )

      const TranslatedComponent = ({name}: IOutterProps) => (
        <I18nConsumer>
          {(i18n) =>
            <span>{ i18n.t('welcome') } {name}! (locale={i18n.locale})</span>
          }
        </I18nConsumer>
      )

      const { I18nProvider, I18nConsumer } = createI18nContext({locale: 'de', t: () => 'ja!'})

      const App = () => <I18nProvider locale={'de'} makeT={makeT}>
        <TranslatedComponent name={'lieber Nutzer'}/>
      </I18nProvider>

      it('works', () => {
        const component = mount(<App/>)
        expect(component.html()).toBe('<span>Herzlich willkommen lieber Nutzer! (locale=de)</span>')
      })
    })

    describe('when locale and keys are enums', () => {
      enum Locale { DE, EN }
      enum Key { WELCOME }

      // tslint:disable-next-line:variable-name
      const germanT = (_key: Key) => 'jawohl!'
      // tslint:disable-next-line:variable-name
      const englishT = (_key: Key) => 'what he says?'

      const makeT = (locale: Locale) => {
        switch (locale) {
          case Locale.DE: return germanT
          case Locale.EN: return englishT
          default:
            // tslint:disable-next-line:variable-name
            const _exhaustiveCheck: never = locale
            return _exhaustiveCheck
        }
      }

      const TranslatedComponent = ({name}: IOutterProps) => (
        <I18nConsumer>
          {(i18n) =>
            <span>{ i18n.t(Key.WELCOME) } {name}! (locale={i18n.locale})</span>
          }
        </I18nConsumer>
      )

      const { I18nProvider, I18nConsumer } = createI18nContext(
        // tslint:disable-next-line:variable-name
        {locale: Locale.DE, t: (_key: Key) => 'ja!'}
      )

      const App = () => <I18nProvider locale={Locale.DE} makeT={makeT}>
        <TranslatedComponent name={'lieber Nutzer'}/>
      </I18nProvider>

      it('works', () => {
        const component = mount(<App/>)
        expect(component.html()).toBe('<span>jawohl! lieber Nutzer! (locale=0)</span>')
      })
    })

    describe('when we need context like the name of a person', () => {
      enum Locale { DE, EN }
      enum Key { WELCOME }
      interface ITArgs {
        key: Key
        context: {
          name: string
        }
      }

      // tslint:disable-next-line:variable-name
      const germanT = (args: ITArgs) => `jawohl, ${args.context.name}!`
      // tslint:disable-next-line:variable-name
      const englishT = (args: ITArgs) => `what he says, ${args.context.name}?`

      const makeT = (locale: Locale) => {
        switch (locale) {
          case Locale.DE: return germanT
          case Locale.EN: return englishT
          default:
            // tslint:disable-next-line:variable-name
            const _exhaustiveCheck: never = locale
            return _exhaustiveCheck
        }
      }

      const TranslatedComponent = ({name}: IOutterProps) => (
        <I18nConsumer>
          {(i18n) =>
            <span>{ i18n.t({key: Key.WELCOME, context: {name}}) } (locale={i18n.locale})</span>
          }
        </I18nConsumer>
      )

      const { I18nProvider, I18nConsumer } = createI18nContext(
        // tslint:disable-next-line:variable-name
        {locale: Locale.DE, t: (_args) => 'ja!'}
      )

      const App = () => <I18nProvider locale={Locale.DE} makeT={makeT}>
        <TranslatedComponent name={'lieber Nutzer'}/>
      </I18nProvider>

      it('works', () => {
        const component = mount(<App/>)
        expect(component.html()).toBe('<span>jawohl, lieber Nutzer! (locale=0)</span>')
      })
    })
  })
})
