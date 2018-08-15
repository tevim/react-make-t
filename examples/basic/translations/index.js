import template from 'backtick-template'

import englishTranslations from './en.json'
import germanTranslations from './de.json'

const translations = {
  de: germanTranslations,
  en: englishTranslations
}

function lookup (data, key) {
  const message = key.split('.').reduce(
    (namespace, name) => {
      switch (typeof namespace) {
        case 'undefined': return undefined
        case 'string': throw new Error(`Can't walk down key: ${key}`)
        default: return namespace[name]
      }
    },
    data
  )

  if (typeof message === 'string') {
    return message
  }

  if (Array.isArray(message)) {
    return message
  }

  return `Missing:${key}`
}

export const makeT = (locale) => {
  if (!translations[locale]) {
    throw new Error(`No translations found for locale '${locale}'`)
  }

  return ({ key, params = {} }) => template(lookup(translations[locale], key), params)
}
