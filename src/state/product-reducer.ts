import Product from '../model/Product';
import { ADD_PRODUCT_TO_CART, LOAD_PRODUCTS, REMOVE_PRODUCT_FROM_CART } from './actions';
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
