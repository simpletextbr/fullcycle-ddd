import Order from "../../../domain/checkout/entity/order";
import IOrderRepository from "../../../domain/checkout/repository/IOrderRepository";
import CustomerModel from "../../consumer/sequelize/model/customer.model";
import OrderModel from "../sequelize/model/order.model";
import OrderItemModel from "../sequelize/model/orderItem.model";

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
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (transaction) => {
      await OrderModel.update(
        {
          customerId: entity.customerId,
          total: entity.total(),
        },
        { where: { id: entity.id }, transaction }
      );
      await OrderItemModel.destroy({
        where: { orderId: entity.id },
        transaction,
      });
      await OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
          orderId: entity.id,
        })),
        { transaction }
      );
    });
  }
  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: { id },
      include: [
        { model: OrderItemModel, as: "items" },
        { model: CustomerModel, as: "customer" },
      ],
    });
    return order.toJSON();
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [
        { model: OrderItemModel, as: "items" },
        { model: CustomerModel, as: "customer" },
      ],
    });
    return orders.map((order) => order.toJSON());
  }
}
