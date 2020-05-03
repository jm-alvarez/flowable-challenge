import Product from '../model/Product';

const SERVER_API = 'http://localhost:3000';

export const getProductList = async (page: number): Promise<Product[]> => {
  const response = await fetch(`${SERVER_API}/grocery?_page=${page}`, {
    method: 'GET'
  });
  return response.ok ? response.json() : [];
};

export const updateProductStock = async (productId: string, stock: number) => {
  const response = await fetch(`${SERVER_API}/grocery/${productId}`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({ stock: stock })
  });
  return response.ok ? response.json() : [];
};
