import IRepository from "../../@shared/repository/IRepository";
import Customer from "../entity/customer";

export default interface ICustomerRepository extends IRepository<Customer> {}
