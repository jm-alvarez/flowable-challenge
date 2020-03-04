import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Checkout from './Checkout';

describe('Checkout', () => {
  let container: Element;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('does not render checkout button when checking out', () => {
    act(() => {
      render(
        <Checkout checkingOut={true} totalPrice={0} doCheckout={() => true} />,
        container
      );
    });

    expect(container.textContent).toEqual(
      expect.not.stringContaining('Checkout')
    );
  });

  it('renders checkout button when NOT checking out', () => {
    act(() => {
      render(
        <Checkout checkingOut={false} totalPrice={0} doCheckout={() => true} />,
        container
      );
    });

    expect(container.textContent).toEqual(expect.stringContaining('Checkout'));
  });
});
