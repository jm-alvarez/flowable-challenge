import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import reducers from '../../state/reducers';
import Checkout from './Checkout';

let container: HTMLElement;
let store: Store;
let doCheckout: jest.Mock;

beforeEach(() => {
  store = createStore(reducers, {
    totalPrice: 100,
  });
  doCheckout = jest.fn();

  container = render(
    <Provider store={store}>
      <Checkout checkingOut={false} doCheckout={doCheckout} />
    </Provider>
  ).container;
});

test('renders price and button when not checking out', () => {
  expect(container.getElementsByClassName('total-price')[0].textContent).toEqual('100$');
  expect(container.getElementsByTagName('button')).toHaveLength(1);
});

test('does checkout on click', () => {
  fireEvent.click(container.getElementsByTagName('button')[0]);
  expect(doCheckout).toHaveBeenCalled();
});

test('does not render price and button when checking out', () => {
  container = render(
    <Provider store={store}>
      <Checkout checkingOut={true} doCheckout={doCheckout} />
    </Provider>
  ).container;

  expect(container.getElementsByClassName('total-price')).toHaveLength(0);
  expect(container.getElementsByTagName('button')).toHaveLength(0);
  expect(container.getElementsByTagName('svg')).toHaveLength(1);
});
