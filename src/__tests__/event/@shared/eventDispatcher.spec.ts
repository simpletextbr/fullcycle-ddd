import EventDispatcher from "../../../domain/event/@shared/eventDispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../../domain/event/product/handler/sendEmailWhenProductIsCreated.handler";

describe("Domain events unit tests", () => {
  it("should be able to register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
  });
});
