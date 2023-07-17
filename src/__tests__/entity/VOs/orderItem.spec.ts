import OrderItem from "../../../entity/VOs/orderItem";

describe("OrderItem unit test", () => {

    test("should throw error when id is empty", () => {
        expect(() => new OrderItem("", "name", 1, 1, "123")).toThrowError("ID is required");
    });

    test("should throw error when name is empty", () => {
        expect(() => new OrderItem("id", "", 1, 1, "123")).toThrowError("Name is required");
    });

    test("should throw error when quantity is empty", () => {
        expect(() => new OrderItem("id", "name", 0, 1, "123")).toThrowError("Quantity must be greater than 0");
    });

    test("should throw error when price is less than 0", () => {
        expect(() => new OrderItem("id", "name", 1, -1, "123")).toThrowError("Price is less than 0");
    });

    test("should throw error when productId is empty", () => {
        expect(() => new OrderItem("id", "name", 1, 1, "")).toThrowError("ProductId is required");
    });

    test("should return price", () => {
        const orderItem = new OrderItem("id", "name", 1, 1, "123");
        expect(orderItem.price).toBe(1);
    });

});
