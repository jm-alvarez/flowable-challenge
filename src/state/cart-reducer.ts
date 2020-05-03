import { emitAddedProductToast, emitRemovedProductToast } from './../utils/toasts';
import CartProducts from '../model/CartProducts';
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, EMPTY_CART } from './actions';
import { IAction } from './reducers';

const cart = (state: CartProducts = {}, action: IAction) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      emitAddedProductToast();

      return {
        ...state,
        [action.payload.id]: action.payload.quantity
      };

    case REMOVE_PRODUCT_FROM_CART:
      emitRemovedProductToast();
      const { [action.payload.id]: quantity, ...products } = state;

      return action.payload.quantity !== 0
        ? {
            ...products,
            [action.payload.id]: action.payload.quantity
          }
        : { ...products };

    case EMPTY_CART:
      return {};

    default:
      return state;
  }
};

export default cart;
