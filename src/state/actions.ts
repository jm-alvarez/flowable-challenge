import Product from '../model/Product';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const loadProducts = (products: Product[]) => {
  return {
    type: LOAD_PRODUCTS,
    payload: products,
  };
};

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const addProductToCart = (product: Product, quantity: number = 0) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { id: product.id, quantity: quantity + 1, price: product.price },
  };
};

export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const removeProductFromCart = (product: Product, quantity: number) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: { id: product.id, quantity: quantity - 1, price: product.price },
  };
};

export const EMPTY_CART = 'EMPTY_CART';
export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};
