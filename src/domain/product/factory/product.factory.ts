import { v4 as uuidv4 } from "uuid";
import Product from "../entity/product";
import IProduct from "../entity/product.interface";
import Product10OFF from "../entity/product10OFF";

export default class ProductFactory {
  public static create(type: string, name: string, price: number): IProduct {
    const id = uuidv4();
    switch (type) {
      case "normal":
        return new Product(id, name, price);
      case "10OFF":
        return new Product10OFF(id, name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}
