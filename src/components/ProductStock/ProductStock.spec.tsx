import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductStock from './ProductStock';

test('renders', () => {
  const { container } = render(<ProductStock stock={10} addProductToCart={() => {}} />);
  expect(container.textContent).toEqual('10 left');
});

test('should add product to card on click', () => {
  const callback = jest.fn();
  const { container } = render(<ProductStock stock={10} addProductToCart={callback} />);
  fireEvent.click(container.getElementsByClassName('add-product-icon')[0]);

  expect(callback).toHaveBeenCalled();
});
