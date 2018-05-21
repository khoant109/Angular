import { Product } from './product';

export class ProductService {
  public static productCount = 10;

  public static products = new Array<Product>(
    new Product(1, 'Product 1', 100000, 'Description 1'),
    new Product(2, 'Product 2', 100000, 'Description 2'),
    new Product(3, 'Product 3', 100000, 'Description 3'),
    new Product(4, 'Product 4', 100000, 'Description 4'),
    new Product(5, 'Product 5', 100000, 'Description 5'),
    new Product(6, 'Product 6', 100000, 'Description 6'),
    new Product(7, 'Product 7', 100000, 'Description 7'),
    new Product(8, 'Product 8', 100000, 'Description 8'),
    new Product(9, 'Product 9', 100000, 'Description 9'),
    new Product(10, 'Product 10', 100000, 'Description 10')
  );

  public static getAll() {
    return this.products;
  }

  public static get(id: number) {
    return this.products.find(x => x.id === id);
  }

  public static init() {
    return new Product(0, '', 0, '');
  }

  public static add(product: Product) {
    if (product.id === 0) {
      this.productCount++;
      this.products.push(new Product(this.productCount, product.name, product.price, product.description));
    }
  }

  public static edit(product: Product) {
    this.products = this.products.map((item: Product) => {
      if (product.id === item.id) {
        item = new Product(product.id, product.name, product.price, product.description);
      }
      return item;
    });
  }

  public static remove(id: number) {
    this.products = this.products.filter(x => x.id !== id);
    this.productCount = this.productCount--;
  }
}
