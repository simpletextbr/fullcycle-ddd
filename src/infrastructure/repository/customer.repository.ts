import Address from "../../domain/entity/VOs/address";
import Customer from "../../domain/entity/customer";
import ICustomerRepository from "../../domain/repository/ICustomerRepository";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements ICustomerRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    const customer = await CustomerModel.findOne({ where: { id } });
    return customer.toJSON();
  }

  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();
    return customersModel.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.giveRewardPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      );
      customer.Address = address;

      return customer;
    });
  }
}
