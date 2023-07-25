import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ProductModel from "../../../product/sequelize/model/product.model";
import OrderModel from "./order.model";

@Table({ tableName: "order_items", timestamps: false })
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ field: "product_id" })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ field: "customer_id" })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: Awaited<OrderModel>;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare price: number;

  @Column({ allowNull: false })
  declare name: string;
}
