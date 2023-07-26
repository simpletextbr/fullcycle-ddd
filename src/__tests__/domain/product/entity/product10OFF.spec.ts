import Product10OFF from "../../../../domain/product/entity/product10OFF";

describe("Product 10% OFF unit test", () => {
  it("should return a price 10% OFF", () => {
    const product = new Product10OFF("1", "name", 100);
    expect(product.price).toEqual(90);
  });

  it("should change the name", () => {
    const product = new Product10OFF("1", "name", 100);
    product.changeName("new name");
    expect(product.name).toEqual("new name");
  });

  it("should change the price and still applying the discount", () => {
    const product = new Product10OFF("1", "name", 100);
    product.changePrice(200);
    expect(product.price).toEqual(180);
  });

  it("should throw an error when the price is less than 0", () => {
    expect(() => {
      new Product10OFF("1", "name", -1);
    }).toThrow("Price cannot be less than 0");
  });

  it("should throw an error when the name is empty", () => {
    expect(() => {
      new Product10OFF("1", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw an error when the id is not valid", () => {
    expect(() => {
      new Product10OFF("", "name", 100);
    }).toThrow("ID is required");
  });
});
