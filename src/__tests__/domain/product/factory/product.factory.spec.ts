import ProductFactory from "../../../../domain/product/factory/product.factory";

describe("Product Factory unit tests", () => {
  it("should create a product normal", () => {
    const product = ProductFactory.create("normal", "Product 1", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product with 10 off", () => {
    const product = ProductFactory.create("10OFF", "Product 2", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 2");
    expect(product.price).toBe(90);
    expect(product.constructor.name).toBe("Product10OFF");
  });

  it("should create a product with 20 off", () => {
    const product = ProductFactory.create("20OFF", "Product 3", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 3");
    expect(product.price).toBe(80);
    expect(product.constructor.name).toBe("Product20OFF");
  });

  it("should create a product with 30 off", () => {
    const product = ProductFactory.create("30OFF", "Product 4", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 4");
    expect(product.price).toBe(70);
    expect(product.constructor.name).toBe("Product30OFF");
  });

  it("should throw an error when type is invalid", () => {
    expect(() => {
      ProductFactory.create("50OFF", "Product 5", 100);
    }).toThrowError("Invalid product type");
  });
});
