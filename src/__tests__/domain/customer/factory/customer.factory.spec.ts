import Address from "../../../../domain/customer/entity/VOs/address";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";

describe("Customer Factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBeUndefined();
    expect(customer.constructor.name).toBe("Customer");
  });

  it("should create a customer with address", () => {
    const address = new Address("Street 1", 1, "123456-789", "City 1");
    const customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBe(address);
    expect(customer.constructor.name).toBe("Customer");
  });

  it("should throw an error when creating a customer with invalid address", () => {
    const address: Address = null;
    expect(() =>
      CustomerFactory.createWithAddress("John Doe", address)
    ).toThrow("Invalid customer type");
  });
});
