import Product from "../../../../domain/product/entity/product";

describe("Product unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product("", "name", 1)).toThrowError("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("1", "", 1)).toThrowError("Name is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => new Product("1", "name", -1)).toThrowError(
      "Price cannot be less than 0"
    );
  });

  it("should return user id", () => {
    const product = new Product("1", "name", 1);
    expect(product.id).toBe("1");
  });

  it("should change name", () => {
    const product = new Product("1", "name", 1);
    product.changeName("new name");
    expect(product.name).toEqual("new name");
  });

  it("should not change name when empty", () => {
    const product = new Product("1", "name", 1);
    expect(() => product.changeName("")).toThrowError("Name is required");
  });

  it("should not change price when less than 0", () => {
    const product = new Product("1", "name", 1);
    expect(() => product.changePrice(-1)).toThrowError(
      "Price cannot be less than 0"
    );
  });

  it("should change price", () => {
    const product = new Product("1", "name", 1);
    product.changePrice(2);
    expect(product.price).toEqual(2);
  });
});
