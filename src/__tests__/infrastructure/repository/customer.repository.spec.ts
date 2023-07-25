import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/customer/entity/VOs/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepository from "../../../infrastructure/consumer/repository/customer.repository";
import CustomerModel from "../../../infrastructure/consumer/sequelize/model/customer.model";

describe("Customer repository unit tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345-123", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerCreated = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerCreated.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345-123", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerUpdated = new Customer("1", "Customer 2");
    const addressUpdated = new Address("Street 2", 2, "12345-123", "City 2");

    customerUpdated.Address = addressUpdated;

    await customerRepository.update(customerUpdated);

    const customerFound = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerFound.toJSON()).toStrictEqual({
      id: customerUpdated.id,
      name: customerUpdated.name,
      active: customerUpdated.isActive(),
      rewardPoints: customerUpdated.rewardPoints,
      street: customerUpdated.address.street,
      number: customerUpdated.address.number,
      zip: customerUpdated.address.zip,
      city: customerUpdated.address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345-123", "City 1");

    customer.Address = address;

    await customerRepository.create(customer);

    const customerFound = await customerRepository.find("1");

    expect(customerFound).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zip: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "12345-123", "City 1");

    customer1.Address = address1;

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "12345-123", "City 2");

    customer2.Address = address2;

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customersFound = await customerRepository.findAll();

    expect(customersFound).toStrictEqual([customer1, customer2]);
  });
});
