import Address from "./entity/VOs/address";
import OrderItem from "./entity/VOs/orderItem";
import Customer from "./entity/customer";
import Order from "./entity/order";

let customer = new Customer("1", "John Doe");
const address = new Address("Main St", 123, "12345", "NY");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "item 1", 1, 10);
const item2 = new OrderItem("1", "item 2", 1, 20);
const item3 = new OrderItem("1", "item 3", 1, 30);
const order = new Order("1", customer._id, [item1, item2, item3]);
