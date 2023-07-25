import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/IProductRepository";
import ProductModel from "../sequelize/model/product.model";

export default class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });
    return product.toJSON();
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
