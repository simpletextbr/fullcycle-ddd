import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrowError("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrowError("Name is required");
  });

  it("should be able to change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("John Doe");
    expect(customer.name).toBe("John Doe");
  });

  it("should be able to change name", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("should return user id", () => {
    const customer = new Customer("123", "John");
    expect(customer.id).toBe("123");
  });

  it("should return reward points ", () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);
  });

  it("should be able to activate an user", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua 1", 123, "12345-000", "BH");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should be able to activate an user", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua 1", 123, "12345-000", "BH");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should be not able to activate an user", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should be able to deactivate an user", () => {
    const customer = new Customer("123", "John");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should be able to give reward points", () => {
    const customer = new Customer("123", "John");
    expect(customer.rewardPoints).toBe(0);
    customer.giveRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
    customer.giveRewardPoints(1);
    expect(customer.rewardPoints).toBe(101);
  });

  it("should throw error when reward points is less than 0", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.giveRewardPoints(-1);
    }).toThrowError("Reward points must be greater than or equal to 0");
  });
});
