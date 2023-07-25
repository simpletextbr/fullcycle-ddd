import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/VOs/orderItem";
import OrderService from "../../../../domain/checkout/service/order.service";
import Customer from "../../../../domain/customer/entity/customer";

describe("Order service unit tests", () => {
  it("should get total of all orders at moment", () => {
    const item1 = new OrderItem("1", "Product 1", 1, 100, "1");
    const item2 = new OrderItem("2", "Product 2", 2, 200, "2");
    const item3 = new OrderItem("3", "Product 3", 3, 300, "3");

    const order1 = new Order("1", "1", [item1]);
    const order2 = new Order("2", "2", [item2]);
    const order3 = new Order("3", "3", [item3]);

    const total = OrderService.getTotal([order1, order2, order3]);

    expect(total).toBe(1400);
  });

  it("should place an order", () => {
    const customer = new Customer("1", "Customer 1");
    const item1 = new OrderItem("1", "Product 1", 3, 100, "1");
    const item2 = new OrderItem("1", "Product 1", 2, 250, "1");
    const items = [item1, item2];

    const order = OrderService.placeOrder(customer, items);

    expect(customer.rewardPoints).toBe(400);
    expect(order.total()).toBe(800);
  });

  it("should place an order with items", () => {
    const customer = new Customer("1", "Customer 1");

    expect(() => OrderService.placeOrder(customer, [])).toThrowError(
      "Order must have at least one item"
    );
  });
});
