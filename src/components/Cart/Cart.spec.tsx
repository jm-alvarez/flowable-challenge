import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Cart from './Cart';
import SelectedProduct from '../../model/SelectedProduct';

describe('Cart', () => {
  let container: Element;
  const testProducts: SelectedProduct[] = [
    {
      product: {
        id: '41fd4fd9-95c7-4809-96db-a147d352fdbb',
        image_url: 'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
        stock: 20,
        productName: 'Unbranded Metal Chair',
        price: 43,
        productDescription:
          'Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio.',
        favorite: 1
      },
      quantity: 5
    },
    {
      product: {
        id: '20cc33f1-223b-4cf0-878d-fdedb3f60b56',
        image_url: 'https://dummyimage.com/400x400/2ee9f7/000&text=Handcrafted Metal Towels',
        stock: 25,
        productName: 'Handcrafted Metal Towels',
        price: 98,
        productDescription:
          'Rerum minima laudantium blanditiis dolorem dolores ut sint ut quidem.',
        favorite: 0
      },
      quantity: 10
    }
  ];

  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('renders cart empty text when there are no selected products', () => {
    act(() => {
      render(<Cart {...getProps([])} />, container);
    });

    expect(container.textContent).toEqual(expect.stringContaining('Cart is empty'));
  });

  it('renders the selected products', () => {
    act(() => {
      render(<Cart {...getProps(testProducts)} />, container);
    });

    expect(container.textContent).toEqual(expect.not.stringContaining('Cart is empty'));
    expect(container.getElementsByClassName('cart-list-item').length).toEqual(2);
  });
});

function getProps(products: SelectedProduct[]) {
  return {
    selectedProducts: products,
    showProductList: () => true,
    increaseProductQuantity: () => true,
    decreaseProductQuantity: () => true,
    emptyCart: () => true
  };
}
