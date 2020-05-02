import { render } from '@testing-library/react';
import React from 'react';
import ProductDescription from './ProductDescription';

let container: HTMLElement;

beforeEach(() => {
  container = render(
    <ProductDescription productName="testName" productDescription="testDescription" price={10} />
  ).container;
});

test('renders', () => {
  const header = container.getElementsByClassName('header')[0];

  expect(container.getElementsByClassName('product-name')[0].textContent).toEqual('testName');
  expect(header.getElementsByTagName('p')[0].textContent).toEqual('10$');
  expect(container.querySelector('.product-description > p')?.textContent).toEqual(
    'testDescription'
  );
});
