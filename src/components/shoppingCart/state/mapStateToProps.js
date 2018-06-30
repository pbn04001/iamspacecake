import { getShoppingCartCount } from './selectors';

export default function mapStateToProps(state) {
  return {
    shoppingCartCount: getShoppingCartCount(state)
  }
}
