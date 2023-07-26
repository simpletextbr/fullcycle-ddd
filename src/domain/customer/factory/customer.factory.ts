import { v4 as uuidv4 } from "uuid";
import Address from "../entity/VOs/address";
import Customer from "../entity/customer";
import ICustomer from "../entity/customer.interface";

export default class CustomerFactory {
  public static create(name: string): ICustomer {
    const id = uuidv4();
    return new Customer(id, name);
  }

  public static createWithAddress(name: string, address: Address): ICustomer {
    const id = uuidv4();
    if (!address) {
      throw new Error("Invalid customer type");
    } else {
      const customer = new Customer(id, name);
      customer.Address = address;
      return customer;
    }
  }
}
