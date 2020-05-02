import CartProducts from '../model/CartProducts';
import Product from '../model/Product';
import { combineReducers } from 'redux';
import products from './product-reducer';
import cart from './cart-reducer';
import totalPrice from './total-price-reducer';

export interface IAction {
  type: string;
  payload: any;
}

export interface GlobalState {
  products: Product[];
  cart: CartProducts;
  totalPrice: number;
}

const reducers = combineReducers({
  products,
  cart,
  totalPrice,
});

export default reducers;
