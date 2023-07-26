import OrderItem from "./VOs/orderItem";

export default interface IOrder {
  get id(): string;
  get customerId(): string;
  get items(): Array<OrderItem>;
}
