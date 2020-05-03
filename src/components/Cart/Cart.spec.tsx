import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import Product from '../../model/Product';
import reducers from '../../state/reducers';
import Cart from './Cart';

let container: HTMLElement;
let store: Store;
let showProductList: jest.Mock;

beforeEach(() => {
  store = createStore(reducers, {
    products: [generateProduct('p1'), generateProduct('p2'), generateProduct('p3')],
    cart: {
      p1: 2,
      p2: 5
    }
  });

  showProductList = jest.fn();

  container = render(
    <Provider store={store}>
      <Cart showProductList={showProductList} />
    </Provider>
  ).container;
});

test('renders', () => {
  expect(container.getElementsByClassName('cart-container')).toHaveLength(1);
  expect(container.getElementsByClassName('cart-list')).toHaveLength(1);
  expect(container.getElementsByClassName('checkout')).toHaveLength(1);
  expect(container.getElementsByTagName('h4')[0].textContent).toEqual('Cart');
});

test('shows the empty cart message when there are no products selected', () => {
  store = createStore(reducers, {
    products: [generateProduct('p1'), generateProduct('p2'), generateProduct('p3')],
    cart: {}
  });

  container = render(
    <Provider store={store}>
      <Cart showProductList={showProductList} />
    </Provider>
  ).container;

  expect(container.getElementsByClassName('cart-container')).toHaveLength(1);
  expect(container.getElementsByClassName('cart-list')).toHaveLength(0);
  expect(container.getElementsByClassName('checkout')).toHaveLength(0);
  expect(container.getElementsByClassName('cart-empty-message')).toHaveLength(1);
});

test('empties cart on checkout', async () => {
  expect(Object.keys(store.getState().cart)).toHaveLength(2);

  fireEvent.click(container.querySelector('.checkout button') as Element);
  await waitFor(() => expect(showProductList).toHaveBeenCalledTimes(1));
  expect(Object.keys(store.getState().cart)).toHaveLength(0);
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
