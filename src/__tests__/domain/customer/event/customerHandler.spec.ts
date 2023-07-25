import EventDispatcher from "../../../../domain/@shared/event/eventDispatcher";
import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerAddressUpdatedEvent from "../../../../domain/customer/event/customerAddressUpdatedEvent.event";
import CustomerCreatedEvent from "../../../../domain/customer/event/customerCreated.event";
import sendConsole2WhenCustomerIsCreatedHandler from "../../../../domain/customer/event/handle/sendConsole2WhenCustomerIsCreated.handler";
import sendConsoleWhenCustomerAddressIsUpdatedHandler from "../../../../domain/customer/event/handle/sendConsoleWhenCustomerAddressIsUpdated.handler";
import sendConsoleWhenCustomerIsCreatedHandler from "../../../../domain/customer/event/handle/sendConsoleWhenCustomerIsCreatedHandler";

describe("Domain events Customer unit tests", () => {
  it("should be able to register an event when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendConsoleWhenCustomerIsCreatedHandler();
    const eventHandler1 = new sendConsole2WhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler1);
  });

  it("should be able to unregister an event when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendConsoleWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);
  });

  it("should be able to unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendConsoleWhenCustomerIsCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handles", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendConsoleWhenCustomerIsCreatedHandler();
    const eventHandler2 = new sendConsole2WhenCustomerIsCreatedHandler();
    const eventHandler3 = new sendConsoleWhenCustomerAddressIsUpdatedHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    const eventHandlerSpy2 = jest.spyOn(eventHandler2, "handle");
    const eventHandlerSpy3 = jest.spyOn(eventHandler3, "handle");

    const customer = new Customer("1", "Jonh Doe");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    const userCreated = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(userCreated);

    const address = new Address("Rua 1", 123, "123456-789", "Cidade 1");
    customer.Address = address;

    eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler3);

    const addressUpdate = new CustomerAddressUpdatedEvent(customer);

    eventDispatcher.notify(addressUpdate);

    expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
    expect(eventHandlerSpy2).toHaveBeenCalledTimes(1);
    expect(eventHandlerSpy3).toHaveBeenCalledTimes(1);
  });
});
