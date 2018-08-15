import { I18nProvider } from '../app/i18n-context'
import { makeT } from '../translations'

import Welcome from '../components/welcome'

const locale = 'de'

export default () => <I18nProvider locale={locale} makeT={makeT}>
  <Welcome name='J' />
</I18nProvider>
