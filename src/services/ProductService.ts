import Product from '../model/Product';

class ProductService {
  private static readonly SERVER_API = 'http://localhost:3000';

  public static async getProductList(page: number): Promise<Product[]> {
    const response = await fetch(`${this.SERVER_API}/grocery?_page=${page}`, {
      method: 'GET'
    });
    return response.ok ? response.json() : [];
  }

  public static async updateProductStock(productId: string, stock: number) {
    const response = await fetch(`${this.SERVER_API}/grocery/${productId}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ stock: stock })
    });
    return response.ok ? response.json() : [];
  }
}

export default ProductService;
