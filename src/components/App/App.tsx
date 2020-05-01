import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductList } from '../../services/ProductService';
import { loadProducts } from '../../state/actions';
import { GlobalState } from '../../state/reducers';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';
import './App.scss';

const App = () => {
  const MOBILE_BREAKPOINT = 768;
  const [displaying, setDisplaying] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const [nextPage, setNextPage] = useState(2);

  const dispatch = useDispatch();
  const products = useSelector((state: GlobalState) => state.products);

  useEffect(() => {
    getProductList(1).then((products) => {
      dispatch(loadProducts(products));
    });
  }, [dispatch]);

  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  });

  const fetchProducts = () => {
    getProductList(nextPage).then((products) => {
      setTimeout(() => {
        dispatch(loadProducts(products));
        setNextPage(nextPage + 1);
      }, 1000);
    });
  };

  const components = [
    <ProductList key="product-list" showCart={() => setDisplaying(1)} />,
    <Cart key="cart" showProductList={() => setDisplaying(0)} />,
  ];

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={nextPage < 100}
      loader={<React.Fragment></React.Fragment>}
      endMessage={<p>No more products found.</p>}
    >
      {products.length > 0 ? (
        <div className="container">{isMobile ? components[displaying] : components}</div>
      ) : (
        <div className="loader">
          <Loader type="Rings" color="Blue" />
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </InfiniteScroll>
  );
};

export default App;
