import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import Product from '../../model/Product';
import reducers from '../../state/reducers';
import CartList from './CartList';

let container: HTMLElement;
let store: Store;

beforeEach(() => {
  store = createStore(reducers, {
    products: [generateProduct('p1'), generateProduct('p2'), generateProduct('p3')],
    cart: {
      p1: 2,
      p2: 5
    }
  });

  container = render(
    <Provider store={store}>
      <CartList />
    </Provider>
  ).container;
});

test('renders', () => {
  expect(container.getElementsByClassName('cart-list-item')).toHaveLength(2);
});

const generateProduct = (id: string): Product => {
  return {
    id,
    favorite: 0,
    image_url: 'testImage',
    price: 100,
    productDescription: 'testDescription',
    productName: 'testName',
    stock: 30
  };
};
