import Customer from "../entity/customer";
import IRepository from "./IRepository";

export default interface ICustomerRepository extends IRepository<Customer> {}
