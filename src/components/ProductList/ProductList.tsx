import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { connect } from 'react-redux';
import Product from '../../model/Product';
import { GlobalState } from '../../state/reducers';
import ProductListItem from '../ProductListItem/ProductListItem';
import './ProductList.scss';

interface IProps {
  products: Product[];
  showCart: () => void;
}

const ProductList = (props: IProps) => {
  return (
    <div className="product-list-container">
      <div className="title">
        <Typography variant="h4">Product List</Typography>
        <Tooltip title="Go to the shopping cart" arrow>
          <IconButton className="icon-button" color="primary" onClick={props.showCart}>
            <ShoppingCart />
          </IconButton>
        </Tooltip>
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
