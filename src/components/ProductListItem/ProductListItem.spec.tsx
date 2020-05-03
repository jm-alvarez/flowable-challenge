import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import Product from '../../model/Product';
import reducers from '../../state/reducers';
import ProductListItem from './ProductListItem';

let container: HTMLElement;
let store: Store;
let product: Product;

beforeEach(() => {
  product = generateProduct();
  store = createStore(reducers, { products: [product] });
  container = render(
    <Provider store={store}>
      <ProductListItem product={product} />
    </Provider>
  ).container;
});

test('renders', () => {
  expect(container.getElementsByClassName('product-list-item')).toHaveLength(1);
});

test('renders', async () => {
  expect(container.getElementsByClassName('product-stock')[0].textContent).toEqual('30 left');
  expect(store.getState().products[0].stock).toEqual(30);

  fireEvent.click(container.getElementsByClassName('add-product-icon')[0]);
  expect(store.getState().products[0].stock).toEqual(29);
});

const generateProduct = (): Product => {
  return {
    id: 'testId',
    favorite: 0,
    image_url: 'testImage',
    price: 100,
    productDescription: 'testDescription',
    productName: 'testName',
    stock: 30
  };
};
