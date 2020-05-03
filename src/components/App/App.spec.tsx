import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Product from '../../model/Product';
import reducers from '../../state/reducers';
import App from './App';

test('renders the products and the cart', () => {
  const store = createStore(reducers, {
    products: [generateProduct('p1'), generateProduct('p2'), generateProduct('p3')]
  });

  const container = render(
    <Provider store={store}>
      <App />
    </Provider>
  ).container;

  expect(container.getElementsByClassName('infinite-scroll-component')).toHaveLength(1);
  expect(container.getElementsByClassName('product-list-container')).toHaveLength(1);
  expect(container.getElementsByClassName('cart-container')).toHaveLength(1);
});

test('renders the loader when there are no products', () => {
  const store = createStore(reducers, {
    products: []
  });

  const container = render(
    <Provider store={store}>
      <App />
    </Provider>
  ).container;

  expect(container.getElementsByClassName('infinite-scroll-component')).toHaveLength(1);
  expect(container.getElementsByClassName('product-list-container')).toHaveLength(0);
  expect(container.getElementsByClassName('cart-container')).toHaveLength(0);
  expect(container.getElementsByClassName('loader')).toHaveLength(1);
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
