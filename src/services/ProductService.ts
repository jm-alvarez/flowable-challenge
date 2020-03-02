import Product from '../model/Product';

class ProductService {
  private static readonly SERVER_API = 'http://localhost:3000';

  public static async getProductList(page: number): Promise<Product[]> {
    const response = await fetch(`${this.SERVER_API}/grocery?_page=${page}`);
    return response.ok ? response.json() : [];
  }
}

export default ProductService;
