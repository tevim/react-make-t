import PropTypes from 'prop-types'

import { I18nConsumer } from '../app/i18n-context'

const Welcome = ({name}) => (
  <I18nConsumer>
    {(i18n) =>
      <span>{ i18n.t({key: 'index.welcome', params: {name}}) } (locale={i18n.locale})</span>
    }
  </I18nConsumer>
)

Welcome.propTypes = {
  name: PropTypes.string.isRequired
}

export default Welcome
