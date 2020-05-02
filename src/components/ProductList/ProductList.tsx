import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../state/reducers';
import ProductListItem from '../ProductListItem/ProductListItem';
import './ProductList.scss';

interface IProps {
  showCart: () => void;
}

const ProductList = (props: IProps) => {
  const { products } = useSelector((state: GlobalState) => state);

  return (
    <div className="product-list-container">
      <div className="title">
        <Typography variant="h4">Product List</Typography>
        <Tooltip title="Go to the shopping cart" arrow>
          <Fab className="icon-button" color="primary" onClick={props.showCart}>
            <ShoppingCart />
          </Fab>
        </Tooltip>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductList);
