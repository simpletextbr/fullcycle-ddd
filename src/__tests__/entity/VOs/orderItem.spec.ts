import OrderItem from "../../../entity/VOs/orderItem";

describe("OrderItem unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => new OrderItem("", "name", 1, 1)).toThrowError("ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => new OrderItem("id", "", 1, 1)).toThrowError("Name is required");
    });

    it("should throw error when quantity is empty", () => {
        expect(() => new OrderItem("id", "name", 0, 1)).toThrowError("Quantity is required");
    });

    it ("should throw error when price is empty", () => {
        expect(() => new OrderItem("id", "name", 1, 0)).toThrowError("Price is required");
    });

});