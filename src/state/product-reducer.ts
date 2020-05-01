import Product from '../model/Product';
import { LOAD_PRODUCTS, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from './actions';
import { IAction } from './reducers';

const products = (state: Product[] = [], action: IAction) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...state, ...action.payload];

    case ADD_PRODUCT_TO_CART:
      return state.map((product) => {
        if (product.id !== action.payload.id) {
          return product;
        }

        return {
          ...product,
          stock: product.stock - 1,
        };
      });

    case REMOVE_PRODUCT_FROM_CART:
      return state.map((product) => {
        if (product.id !== action.payload.id) {
          return product;
        }

        return {
          ...product,
          stock: product.stock + 1,
        };
      });

    default:
      return state;
  }
};

export default products;
