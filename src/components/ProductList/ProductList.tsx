import React from 'react';
import Product from '../../model/Product';
import ProductListItem from '../ProductListItem/ProductListItem';
import './ProductList.scss';

interface Props {
  products: Product[];
}

class ProductList extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <h2>Product List</h2>
        <div className="product-list">
          {this.props.products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
