import React from 'react';
import Product from '../../model/Product';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductImage from '../ProductImage/ProductImage';
import ProductStock from '../ProductStock/ProductStock';
import './ProductListItem.scss';
import { GlobalState } from '../../state/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '../../state/actions';
import CartProducts from '../../model/CartProducts';

interface IProps {
  product: Product;
}

const ProductListItem = (props: IProps) => {
  const { image_url, productName, productDescription, price, stock } = props.product;

  const cart: CartProducts = useSelector((state: GlobalState) => state.cart);
  const quantity: number = cart[props.product.id];
  const dispatch = useDispatch();

  return (
    <div className="product-list-item">
      <ProductImage imageUrl={image_url} productName={productName} />
      <ProductDescription
        productName={productName}
        productDescription={productDescription}
        price={price}
      />
      <ProductStock
        stock={stock}
        addProductToCart={() => dispatch(addProductToCart(props.product, quantity))}
      />
    </div>
  );
};

export default React.memo(ProductListItem);
