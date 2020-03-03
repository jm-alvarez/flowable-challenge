import React from 'react';
import SelectedProduct from '../../model/SelectedProduct';
import CartListItem from '../CartListItem/CartListItem';
import './CartList.scss';

interface Props {
  selectedProducts: SelectedProduct[];
  increaseProductQuantity: Function;
  decreaseProductQuantity: Function;
}

class CartList extends React.Component<Props, {}> {
  render() {
    return (
      <div className="cart-list">
        {this.props.selectedProducts.map(selectedProduct => (
          <CartListItem
            key={selectedProduct.product.id}
            selectedProduct={selectedProduct}
            increaseProductQuantity={this.props.increaseProductQuantity}
            decreaseProductQuantity={this.props.decreaseProductQuantity}
          />
        ))}
      </div>
    );
  }
}

export default CartList;
