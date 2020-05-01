import { IAction } from './reducers';
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, EMPTY_CART } from './actions';

const totalPrice = (state: number = 0, action: IAction) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return state + action.payload.price;

    case REMOVE_PRODUCT_FROM_CART:
      return state - action.payload.price;

    case EMPTY_CART:
      return 0;

    default:
      return state;
  }
};

export default totalPrice;
