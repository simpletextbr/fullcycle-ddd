import IOrder from "../entity/IOrder";
import OrderItem from "../entity/VOs/orderItem";
import Order from "../entity/order";

interface OrderPropsFactory {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
  }[];
}

export default class OrderFactory {
  public static create(orderProps: OrderPropsFactory): IOrder {
    const items = orderProps.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.quantity,
        item.price,
        item.productId
      );
    });

    return new Order(orderProps.id, orderProps.customerId, items);
  }
}
