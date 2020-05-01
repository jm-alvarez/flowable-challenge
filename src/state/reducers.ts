import CartProducts from '../model/Cart';
import Product from '../model/Product';
import { combineReducers } from 'redux';
import products from './product-reducer';
import cart from './cart-reducer';

export interface IAction {
  type: string;
  payload: any;
}

export interface GlobalState {
  products: Product[];
  cart: CartProducts;
}

const reducers = combineReducers({
  products,
  cart,
});

export default reducers;
