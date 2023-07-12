import OrderItem from "../../entity/VOs/orderItem";
import Customer from "../../entity/customer";
import Order from "../../entity/order";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => { new Order("", "123", []) }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => { new Order("123", "", []) }).toThrowError("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => { new Order("123", "123", []) }).toThrowError("Itens are required");
    });

    it("should calculate total", () => {
        const customer = new Customer("1", "customer 1");
        const customerId = customer.id;
        const item1 = new OrderItem("1", "item 1", 1, 10);
        const item2 = new OrderItem("1", "item 2", 1, 20);
        const item3 = new OrderItem("1", "item 3", 1, 30);
        const order = new Order("1", customerId, [item1, item2, item3]);

        expect(order.total()).toBe(60);
    });
});