import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";

describe("Product repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productCreated = await ProductModel.findOne({ where: { id: "1" } });

    expect(productCreated.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productUpdated = new Product("1", "Product 2", 200);

    await productRepository.update(productUpdated);

    const productFound = await ProductModel.findOne({ where: { id: "1" } });

    expect(productFound.toJSON()).toStrictEqual({
      id: productUpdated.id,
      name: productUpdated.name,
      price: productUpdated.price,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productFound = await productRepository.find("1");

    expect(productFound).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const productsFound = await productRepository.findAll();

    expect(productsFound).toEqual([product1, product2]);
  });
});
