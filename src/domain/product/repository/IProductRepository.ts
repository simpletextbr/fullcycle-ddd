import IRepository from "../../@shared/repository/IRepository";
import Product from "../entity/product";

export default interface IProductRepository extends IRepository<Product> {}
