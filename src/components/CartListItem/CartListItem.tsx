import React from 'react';
import { useDispatch } from 'react-redux';
import Product from '../../model/Product';
import { addProductToCart, removeProductFromCart } from '../../state/actions';
import ProductImage from '../ProductImage/ProductImage';
import './CartListItem.scss';

interface IProps {
  product: Product;
  quantity: number;
}

const CartListItem = (props: IProps) => {
  const { product, quantity } = props;
  const dispatch = useDispatch();

  const quantityComponents = [
    <i
      key="remove"
      className="material-icons"
      onClick={() => dispatch(removeProductFromCart(product, quantity))}
    >
      remove_circle_outline
    </i>,
    <span key="text">{props.quantity}</span>,
    <i
      key="add"
      className="material-icons"
      onClick={() => dispatch(addProductToCart(product, quantity))}
    >
      add_circle_outline
    </i>,
  ];

  const totalPrice = quantity * product.price;

  return (
    <div className="cart-list-item">
      <ProductImage imageUrl={product.image_url} productName={product.productName} />
      <div className="content">
        <p>{product.productName}</p>
        <div className="quantity">
          {product.stock ? quantityComponents : quantityComponents.slice(0, 2)}
        </div>
      </div>
      <p className="item-total-price">{totalPrice}$</p>
    </div>
  );
};

export default React.memo(CartListItem);
