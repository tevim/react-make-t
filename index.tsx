import * as React from 'react'

type MakeTFunction<L, T> = (locale: L) => (TFunction<T>)
type TFunction<T> = (args: T) => string

interface IContextValue<L, T> {
  locale: L
  t: TFunction<T>
}

export interface II18n<L = string, T = string> {
  locale: L
  makeT: MakeTFunction<L, T>
}

export function createI18nContext<L, T>(defaultValue: IContextValue<L, T>) {
  const Context = React.createContext(defaultValue)

  const I18nProvider: React.StatelessComponent<II18n<L, T>> = ({ children, locale, makeT }) => {
    const state = { locale, t: makeT(locale) }

    return (
      <Context.Provider value={state}>{children}</Context.Provider>
    )
  }

  const I18nConsumer = Context.Consumer

  return { I18nProvider, I18nConsumer }
}
