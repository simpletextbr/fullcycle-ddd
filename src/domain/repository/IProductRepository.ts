import Product from "../entity/product";
import IRepository from "./IRepository";

export default interface IProductRepository extends IRepository<Product> {}
