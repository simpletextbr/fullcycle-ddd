import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/VOs/address";
import OrderItem from "../../../domain/entity/VOs/orderItem";
import Customer from "../../../domain/entity/customer";
import Order from "../../../domain/entity/order";
import Product from "../../../domain/entity/product";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import OrderModel from "../../../infrastructure/db/sequelize/model/order.model";
import OrderItemModel from "../../../infrastructure/db/sequelize/model/orderItem.model";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import OrderRepository from "../../../infrastructure/repository/order.repository";
import ProductRepository from "../../../infrastructure/repository/product.repository";

describe("Order repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      ProductModel,
      OrderItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const address = new Address("1", 123, "12345", "Anytown");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      4,
      product.price,
      product.id
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderCreated = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderCreated.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          quantity: orderItem.quantity,
          price: orderItem.price,
          orderId: order.id,
          productId: orderItem.productId,
        },
      ],
    });
  });
});
