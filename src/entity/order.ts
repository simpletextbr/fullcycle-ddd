import OrderItem from "./VOs/orderItem";

export default class Order {
    _id: string;
    _customerId: string;
    _items: Array<OrderItem>;

    constructor(id: string, customerId: string, items: Array<OrderItem>) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
    }

}