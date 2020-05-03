import { IconButton, Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import React from 'react';
import './ProductStock.scss';

interface IProps {
  stock: number;
  addProductToCart: () => void;
}

const ProductStock = (props: IProps) => {
  const { stock } = props;
  return (
    <div className="product-stock">
      <Typography variant="body1">{stock} left</Typography>
      {stock ? (
        <Tooltip title="Add to shopping cart" arrow>
          <IconButton className="add-product-icon" color="primary" onClick={props.addProductToCart}>
            <AddShoppingCart />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default React.memo(ProductStock);
