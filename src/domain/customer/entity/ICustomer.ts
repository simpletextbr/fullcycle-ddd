import Address from "./VOs/address";

export default interface ICustomer {
  get id(): string;
  get name(): string;
  get address(): Address;
}
