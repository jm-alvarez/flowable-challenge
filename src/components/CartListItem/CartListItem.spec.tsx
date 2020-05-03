import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import Product from '../../model/Product';
import reducers from '../../state/reducers';
import CartListItem from './CartListItem';

let container: HTMLElement;
let store: Store;

beforeEach(() => {
  const product = generateProduct('p1');
  store = createStore(reducers, {
    products: [product]
  });

  container = render(
    <Provider store={store}>
      <CartListItem product={product} quantity={15} />
    </Provider>
  ).container;
});

test('renders', () => {
  expect(container.getElementsByClassName('cart-list-item')).toHaveLength(1);
  expect(container.getElementsByTagName('button')).toHaveLength(2);
  expect(container.querySelector('.product-name')?.textContent).toEqual('testName');
  expect(container.querySelector('.item-total-price')?.textContent).toEqual('1500$');
});

test('removes one unit', () => {
  expect(store.getState().products[0].stock).toEqual(30);

  const stockButtons = container
    .getElementsByClassName('quantity')[0]
    .getElementsByTagName('button');

  fireEvent.click(stockButtons[1]);
  expect(store.getState().products[0].stock).toEqual(29);
});

test('adds one unit', () => {
  expect(store.getState().products[0].stock).toEqual(30);

  const stockButtons = container
    .getElementsByClassName('quantity')[0]
    .getElementsByTagName('button');

  fireEvent.click(stockButtons[0]);
  expect(store.getState().products[0].stock).toEqual(31);
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
