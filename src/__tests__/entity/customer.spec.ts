import Address from "../../entity/VOs/address";
import Customer from "../../entity/customer";

describe("Customer unit tests", () => {

    test("should throw error when id is empty", () => {
        expect(() => new Customer("", "John Doe")).toThrowError("ID is required");
    });

    test("should throw error when name is empty", () => {
        expect(() => new Customer("123", "")).toThrowError("Name is required");
    });

    test("should be able to change name", () => {
        const customer = new Customer("123", "John")
        customer.changeName("John Doe")
        expect(customer.name ).toBe("John Doe");
    });

    test("should be able to change name", () => {
        const customer = new Customer("123", "John")
        expect(() => { customer.changeName("") }).toThrowError("Name is required");
    });

    test("should return user id", () => {
        const customer = new Customer("123", "John")
        expect(customer.id).toBe("123");
    });

    test("should be able to activate an user", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Rua 1", 123, "12345-000", "BH");
        customer.Address = address;

        customer.activate()

        expect(customer.isActive()).toBe(true);
    });

    test("should be able to activate an user", () => {
        const customer = new Customer("123", "John");
        const address = new Address("Rua 1", 123, "12345-000", "BH");
        customer.Address = address;

        customer.activate()

        expect(customer.isActive()).toBe(true);
    });

    test("should be not able to activate an user", () => {
        const customer = new Customer("123", "John")
        expect(() => { customer.activate() }).toThrowError("Address is mandatory to activate a customer");
    });

    test("should be able to deactivate an user", () => {
        const customer = new Customer("123", "John")
        customer.deactivate()
        expect(customer.isActive()).toBe(false);
    });
});
