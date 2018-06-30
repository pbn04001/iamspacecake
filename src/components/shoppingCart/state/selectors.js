import { createSelector } from 'reselect';

export const getShoppingCart = state => state && state.shoppingCart

export const getShoppingCartCount = createSelector(
    getShoppingCart,
    shoppingCart => shoppingCart.items.length,
);