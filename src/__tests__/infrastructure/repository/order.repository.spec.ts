import { Sequelize } from "sequelize-typescript";
import OrderItem from "../../../domain/checkout/entity/VOs/orderItem";
import Order from "../../../domain/checkout/entity/order";
import Address from "../../../domain/customer/entity/VOs/address";
import Customer from "../../../domain/customer/entity/customer";
import Product from "../../../domain/product/entity/product";
import OrderRepository from "../../../infrastructure/checkout/repository/order.repository";
import OrderModel from "../../../infrastructure/checkout/sequelize/model/order.model";
import OrderItemModel from "../../../infrastructure/checkout/sequelize/model/orderItem.model";
import CustomerRepository from "../../../infrastructure/consumer/repository/customer.repository";
import CustomerModel from "../../../infrastructure/consumer/sequelize/model/customer.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";

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

  it("should update an order", async () => {
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

    const productUpdated = new Product("2", "Product 2", 200);
    const customerUpdated = new Customer("2", "John Doe 2");
    const addressUpdated = new Address("2", 456, "54321", "Othertown");
    customerUpdated.Address = addressUpdated;
    await customerRepository.create(customerUpdated);
    await productRepository.create(productUpdated);

    const orderItemUpdated = new OrderItem(
      "1",
      productUpdated.name,
      2,
      productUpdated.price,
      productUpdated.id
    );

    const orderUpdated = new Order("1", customerUpdated.id, [orderItemUpdated]);
    await orderRepository.update(orderUpdated);

    const orderFound = await OrderModel.findOne({
      where: { id: orderUpdated.id },
      include: ["items"],
    });

    expect(orderFound.toJSON()).toStrictEqual({
      id: orderUpdated.id,
      customerId: orderUpdated.customerId,
      total: orderUpdated.total(),
      items: [
        {
          id: orderItemUpdated.id,
          name: orderItemUpdated.name,
          quantity: orderItemUpdated.quantity,
          price: orderItemUpdated.price,
          orderId: orderItemUpdated.id,
          productId: orderItemUpdated.productId,
        },
      ],
    });
  });

  it("should find an order", async () => {
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

    const orderFounded = await orderRepository.find(order.id);

    expect(orderFounded).toStrictEqual({
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
      customer: {
        id: customer.id,
        name: customer.name,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints,
        city: customer.address.city,
        zip: customer.address.zip,
        street: customer.address.street,
        number: customer.address.number,
      },
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John Doe");
    const customer2 = new Customer("2", "John Doe 2");
    const address = new Address("1", 123, "12345", "Anytown");
    const address2 = new Address("2", 456, "54321", "Othertown");
    customer.Address = address;
    customer2.Address = address2;
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      4,
      product.price,
      product.id
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      2,
      product2.price,
      product2.id
    );

    const order = new Order("1", customer.id, [orderItem]);
    const order2 = new Order("2", customer2.id, [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const ordersFounded = await orderRepository.findAll();

    expect(ordersFounded.map((order) => order)).toStrictEqual([
      {
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
        customer: {
          id: customer.id,
          name: customer.name,
          active: customer.isActive(),
          rewardPoints: customer.rewardPoints,
          city: customer.address.city,
          zip: customer.address.zip,
          street: customer.address.street,
          number: customer.address.number,
        },
      },
      {
        id: order2.id,
        customerId: order2.customerId,
        total: order2.total(),
        items: [
          {
            id: orderItem2.id,
            name: orderItem2.name,
            quantity: orderItem2.quantity,
            price: orderItem2.price,
            orderId: order2.id,
            productId: orderItem2.productId,
          },
        ],
        customer: {
          id: customer2.id,
          name: customer2.name,
          active: customer2.isActive(),
          rewardPoints: customer2.rewardPoints,
          city: customer2.address.city,
          zip: customer2.address.zip,
          street: customer2.address.street,
          number: customer2.address.number,
        },
      },
    ]);
  });
});
