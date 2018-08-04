import { bindActionCreators } from 'redux'
import { startSearch, closeSearch } from './actions'

const mapDispatchToProps = dispatch => bindActionCreators(
  { startSearch, closeSearch },
  dispatch,
)

export default mapDispatchToProps
