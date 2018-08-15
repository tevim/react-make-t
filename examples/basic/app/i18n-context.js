import { createI18nContext } from 'react-make-t'

import { makeT } from '../translations'

const i18nContext = createI18nContext({
  locale: 'de',
  makeT
})

export default i18nContext
export const I18nConsumer = i18nContext.I18nConsumer
export const I18nProvider = i18nContext.I18nProvider
