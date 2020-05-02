import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import './ProductDescription.scss';

interface IProps {
  productName: string;
  productDescription: string;
  price: number;
}

const ProductDescription = (props: IProps) => {
  const { productDescription, productName, price } = props;

  const DescriptionTooltip = withStyles({
    tooltip: {
      'font-size': '16px',
    },
  })(Tooltip);

  const descriptionElement =
    productDescription.length > 75 ? (
      <DescriptionTooltip title={productDescription}>
        <Typography variant="body2">{productDescription.substring(0, 75)}...</Typography>
      </DescriptionTooltip>
    ) : (
      <Typography variant="body2">{productDescription.substring(0, 75)}...</Typography>
    );

  return (
    <div className="product-description">
      <div className="header">
        <Typography variant="subtitle1" className="product-name">
          {productName}
        </Typography>
        <Typography variant="body1">{price}$</Typography>
      </div>
      {descriptionElement}
    </div>
  );
};

export default React.memo(ProductDescription);
