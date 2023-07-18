import Product from "../entity/product";
import RepositoryInterface from "./repositoryInterface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
