import React from 'react';
import SelectedProduct from '../../model/SelectedProduct';
import ProductImage from '../ProductImage/ProductImage';
import './CartListItem.scss';

interface Props {
  selectedProduct: SelectedProduct;
}

interface State {
  totalPrice: number;
}

class CartListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { selectedProduct } = props;
    this.state = {
      totalPrice: selectedProduct.quantity * selectedProduct.product.price
    };
  }

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
          <div className="quantity">
            <i className="material-icons">remove_circle_outline</i>
            <span>{selectedProduct.quantity}</span>
            <i className="material-icons">add_circle_outline</i>
          </div>
        </div>
        <p className="item-total-price">{this.state.totalPrice}$</p>
      </div>
    );
  }
}

export default CartListItem;
