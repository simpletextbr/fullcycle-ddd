export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _quantity: number;
  private _price: number;

  constructor(
    id: string,
    name: string,
    quantity: number,
    price: number,
    productId: string
  ) {
    this._id = id;
    this._name = name;
    this._quantity = quantity;
    this._price = price;
    this._productId = productId;

    this.validate();
  }

  validate() {
    if (!this._id || this._id.length === 0) throw new Error("ID is required");
    if (!this._name || this._name.length === 0)
      throw new Error("Name is required");
    if (!this._quantity || this._quantity <= 0)
      throw new Error("Quantity must be greater than 0");
    if (this._price < 0) throw new Error("Price is less than 0");
    if (!this._productId || this._productId.length === 0)
      throw new Error("ProductId is required");
  }

  get id(): string {
    return this._id;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
