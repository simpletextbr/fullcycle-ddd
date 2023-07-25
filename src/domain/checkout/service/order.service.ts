import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/VOs/orderItem";
import Order from "../entity/order";

export default class OrderService {
  static getTotal(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0)
      throw new Error("Order must have at least one item");

    const order = new Order(uuid(), customer.id, items);
    const rewardsGained = order.total() / 2;

    customer.giveRewardPoints(rewardsGained);
    return order;
  }
}
