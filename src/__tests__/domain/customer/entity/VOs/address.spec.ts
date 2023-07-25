import Address from "../../../../../domain/customer/entity/VOs/address";

describe("Address unit tests", () => {
  it("should return a string representation of the address", () => {
    const address = new Address("Rua 1", 123, "12345-000", "BH");
    expect(address.toString()).toBe("Rua 1, 123 - 12345-000 - BH");
  });

  it("should throw error when street is empty", () => {
    expect(() => new Address("", 123, "12345-000", "BH")).toThrowError(
      "Street is required"
    );
  });

  it("should throw error when number is empty", () => {
    expect(() => new Address("Rua 1", NaN, "12345-000", "BH")).toThrowError(
      "Number is required"
    );
  });

  it("should throw error when zip is empty", () => {
    expect(() => new Address("Rua 1", 123, "", "BH")).toThrowError(
      "Zip Code is required"
    );
  });

  it("should throw error when city is empty", () => {
    expect(() => new Address("Rua 1", 123, "12345-000", "")).toThrowError(
      "City is required"
    );
  });
});
