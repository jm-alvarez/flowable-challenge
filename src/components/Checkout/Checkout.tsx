import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Payment from '@material-ui/icons/Payment';
import React from 'react';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../state/reducers';
import './Checkout.scss';

interface IProps {
  doCheckout: () => void;
  checkingOut: boolean;
}

const Checkout = (props: IProps) => {
  const totalPrice = useSelector((state: GlobalState) => state.totalPrice);

  return (
    <div className="checkout">
      {props.checkingOut ? (
        <Loader type="ThreeDots" color="Blue" />
      ) : (
        <React.Fragment>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<Payment />}
            onClick={props.doCheckout}
          >
            Checkout
          </Button>
          <Typography variant="h6" className="total-price">
            {totalPrice}$
          </Typography>
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(Checkout);
