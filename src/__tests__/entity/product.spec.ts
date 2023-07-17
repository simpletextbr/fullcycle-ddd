import Product from "../../entity/product";

describe("Product unit test", () => {

    test("should throw error when id is empty", () => {
        expect(() => new Product("", "name", 1)).toThrowError("ID is required");
    });

    test("should throw error when name is empty", () => {
        expect(() => new Product("1", "", 1)).toThrowError("Name is required");
    });

    test("should throw error when price is less than 0", () => {
        expect(() => new Product("1", "name", -1)).toThrowError("Price cannot be less than 0");
    });

    test("should return user id", () => {
        const product = new Product("1", "name", 1);
        expect(product.id).toBe("1");
    });

    test("should change name", () => {
        const product = new Product("1", "name", 1);
        product.changeName("new name");
        expect(product.name).toEqual("new name");
    });

    test("should not change name when empty", () => {
        const product = new Product("1", "name", 1);
        expect(() => product.changeName("")).toThrowError("Name is required");
    });

    test("should not change price when less than 0", () => {
        const product = new Product("1", "name", 1);
        expect(() => product.changePrice(-1)).toThrowError("Price cannot be less than 0");
    });

    test("should change price", () => {
        const product = new Product("1", "name", 1);
        product.changePrice(2);
        expect(product.price).toEqual(2);
    });
});
