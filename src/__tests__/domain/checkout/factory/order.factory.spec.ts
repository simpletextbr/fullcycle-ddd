import { v4 as uuidv4 } from "uuid";
import OrderFactory from "../../../../domain/checkout/factory/order.factory";

describe("Order factory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuidv4(),
      customerId: uuidv4(),
      items: [
        {
          id: uuidv4(),
          name: "Product 1",
          price: 10,
          quantity: 1,
          productId: uuidv4(),
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
