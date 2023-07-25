import OrderItem from "./VOs/orderItem";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: Array<OrderItem>;
  private _total: number;

  constructor(id: string, customerId: string, items: Array<OrderItem>) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): void {
    if (!this._id || this._id.length === 0) throw new Error("Id is required");
    if (!this._customerId || this._customerId.length === 0)
      throw new Error("CustomerId is required");
    if (this._items.length === 0) throw new Error("Itens are required");
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): Array<OrderItem> {
    return this._items;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
