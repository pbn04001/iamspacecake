import { bindActionCreators } from 'redux';
import { addItemToShoppingCart } from './actions';

export const mapDispatchToProps = dispatch => bindActionCreators(
    { addItemToShoppingCart },
    dispatch,
);

export default mapDispatchToProps;

