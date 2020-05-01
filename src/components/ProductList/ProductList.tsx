import React from 'react';
import Product from '../../model/Product';
import ProductListItem from '../ProductListItem/ProductListItem';
import './ProductList.scss';
import { connect } from 'react-redux';
import { GlobalState } from '../../state/reducers';

interface IProps {
  products: Product[];
  showCart: () => void;
}

const ProductList = (props: IProps) => {
  return (
    <div className="product-list-container">
      <div className="title">
        <i className="material-icons" title="Go to the shopping cart" onClick={props.showCart}>
          arrow_back_ios
        </i>
        <h2>Product List</h2>
      </div>
      <div className="product-list">
        {props.products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductList);
