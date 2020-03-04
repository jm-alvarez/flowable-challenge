import React from 'react';
import SelectedProduct from '../../model/SelectedProduct';
import ProductImage from '../ProductImage/ProductImage';
import './CartListItem.scss';

interface Props {
  selectedProduct: SelectedProduct;
  increaseProductQuantity: Function;
  decreaseProductQuantity: Function;
}

export default function CartListItem(props: Props) {
  const { selectedProduct } = props;
  const quantityComponents = [
    <i
      key="remove"
      className="material-icons"
      onClick={() => props.decreaseProductQuantity(selectedProduct)}
    >
      remove_circle_outline
    </i>,
    <span key="text">{selectedProduct.quantity}</span>,
    <i
      key="add"
      className="material-icons"
      onClick={() => props.increaseProductQuantity(selectedProduct.product)}
    >
      add_circle_outline
    </i>
  ];

  const totalPrice = selectedProduct.quantity * selectedProduct.product.price;

  return (
    <div className="cart-list-item">
      <ProductImage
        imageUrl={selectedProduct.product.image_url}
        productName={selectedProduct.product.productName}
      />
      <div className="content">
        <p>{selectedProduct.product.productName}</p>
        <div className="quantity">
          {selectedProduct.product.stock
            ? quantityComponents
            : quantityComponents.slice(0, 2)}
        </div>
      </div>
      <p className="item-total-price">{totalPrice}$</p>
    </div>
  );
}
