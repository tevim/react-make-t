[![CircleCI][circle-ci-badge]][circle-ci-url]

# react-make-t

Internationalization... It should be simple, right? 😉

With `react-make-t` all there is to internationalization is a simple function of type

```typescript
type MakeT = (locale: ILocale) => ((targs: ITArgs) => string))
```

This library works nicely with [Next.js][next], but also with any other [React][react] app.

Installation
===
Install the package with:

```bash
npm install react-make-t
```

Usage
===
Then use the module in your code:

```javascript
import { createI18nContext } from 'react-make-t'
const { I18nProvider, I18nConsumer } = createI18nContext({locale: 'de', t: () => ''})

//
// A simple implementation of `makeT` which fetches translated strings from an object.
//
const translations = {
  de: {
    welcome: 'Herzlich Willkommen'
  }
}

function makeT(locale) {
  const entries = translations[locale]
  
  if (!entries) throw new Error(`Unknown language: ${locale}`)
  
  return function (key) {
    const value = entries[key]
    return value || 'translation missing'
  }
}

//
// Make the current `locale` and `makeT` available to the application.
//
function App() {
  return (
    <I18nProvider locale='de' makeT={makeT}>
      <WelcomePage name={'JJ'}/>
    </I18nProvider>
  )
}

//
// Translate your components!
//
function WelcomePage({name}) {
  return (
    <I18nConsumer>
      {(i18n) =>
        <h1>{ i18n.t('welcome') } {name}!</h1>
        <p>The current locale is { i18n.locale }</p>
      }
    </I18nConsumer>
  )
}
```

Examples
===

You may also have a look at the examples located in the [examples directory][examples]. These can be run locally by cloning this repo, and then running `npm install && npm run dev` inside one of the example directories.

Contributing
===
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using `npm test`.

License
===

react-make-t is Copyright © 2019 [tevim GmbH][tevim]. It is free software, and may be redistributed under the terms specified in the [LICENSE][license] file.

[circle-ci-badge]: https://circleci.com/gh/tevim/react-make-t.svg?style=svg
[circle-ci-url]: https://circleci.com/gh/tevim/react-make-t
[examples]: https://github.com/tevim/react-make-t/tree/master/examples
[license]: https://github.com/tevim/react-make-t/blob/master/LICENSE
[next]: https://nextjs.org/
[react]: https://reactjs.org/
[tevim]: https://www.tevim.com
