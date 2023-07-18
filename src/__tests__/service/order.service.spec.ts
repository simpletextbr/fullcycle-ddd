import OrderItem from "../../entity/VOs/orderItem";
import Order from "../../entity/order";
import OrderService from "../../service/order.service";

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
});
