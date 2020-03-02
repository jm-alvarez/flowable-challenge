import React from 'react';
import SelectedProduct from '../../model/SelectedProduct';
import ProductImage from '../ProductImage/ProductImage';
import './CartListItem.scss';

interface Props {
  selectedProduct: SelectedProduct;
}

class CartListItem extends React.Component<Props, {}> {
  render() {
    const { selectedProduct } = this.props;

    return (
      <div className="cart-list-item">
        <ProductImage
          imageUrl={selectedProduct.product.image_url}
          productName={selectedProduct.product.productName}
        />
        <div className="content">
          <p>{selectedProduct.product.productName}</p>
          <div>
            <button>-</button>
            <span className="quantity">{selectedProduct.quantity}</span>
            <button>+</button>
          </div>
        </div>
        <p className="item-total-price">{selectedProduct.product.price}$</p>
      </div>
    );
  }
}

export default CartListItem;
