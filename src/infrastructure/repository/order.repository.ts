import Order from "../../domain/entity/order";
import IOrderRepository from "../../domain/repository/IOrderRepository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/orderItem.model";

export default class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }
  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
