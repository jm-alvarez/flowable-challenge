import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
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
  const totalPrice = quantity * product.price;
  const dispatch = useDispatch();

  return (
    <div className="cart-list-item">
      <ProductImage imageUrl={product.image_url} productName={product.productName} />

      <div className="content">
        <Typography className="product-name" variant="body1">
          {product.productName}
        </Typography>

        <div className="quantity">
          <Tooltip key="remove" title="Remove 1 unit" arrow>
            <IconButton
              className="icon-button"
              color="primary"
              onClick={() => dispatch(removeProductFromCart(product, quantity))}
            >
              <RemoveCircleOutline />
            </IconButton>
          </Tooltip>

          <Typography variant="body1">{props.quantity}</Typography>

          {product.stock ? (
            <Tooltip title="Add 1 unit" arrow>
              <IconButton
                className="icon-button"
                color="primary"
                onClick={() => dispatch(addProductToCart(product, quantity))}
              >
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <Typography className="item-total-price" variant="body1">
        {totalPrice}$
      </Typography>
    </div>
  );
};

export default React.memo(CartListItem);
