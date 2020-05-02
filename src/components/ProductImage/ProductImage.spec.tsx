import { render } from '@testing-library/react';
import React from 'react';
import ProductImage from './ProductImage';

let container: HTMLElement;

beforeEach(() => {
  container = render(<ProductImage imageUrl="http://test.com/" productName="testName" />).container;
});

test('renders', () => {
  const img = container.getElementsByTagName('img');
  expect(img).toHaveLength(1);
  expect(img[0].src).toEqual('http://test.com/');
  expect(img[0].alt).toEqual('testName');
});
