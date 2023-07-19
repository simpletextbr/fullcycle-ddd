import Order from "../../domain/entity/order";
import IRepository from "./IRepository";

export default interface IOrderRepository extends IRepository<Order> {}
