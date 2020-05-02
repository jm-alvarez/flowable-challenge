import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import Product from '../../model/Product';
import reducers from '../../state/reducers';
import ProductList from './ProductList';

let container: HTMLElement;
let store: Store;
let showCart: jest.Mock;

beforeEach(() => {
  store = createStore(reducers, {
    products: [generateProduct('p1'), generateProduct('p2'), generateProduct('p3')],
  });
  showCart = jest.fn();

  container = render(
    <Provider store={store}>
      <ProductList showCart={showCart} />
    </Provider>
  ).container;
});

test('renders', () => {
  expect(container.getElementsByClassName('product-list-item')).toHaveLength(3);
});

test('shows the cart when clicking on the button', () => {
  fireEvent.click(container.getElementsByClassName('icon-button')[0]);
  expect(showCart).toHaveBeenCalled();
});

const generateProduct = (id: string): Product => {
  return {
    id,
    favorite: 0,
    image_url: 'testImage',
    price: 100,
    productDescription: 'testDescription',
    productName: 'testName',
    stock: 30,
  };
};
