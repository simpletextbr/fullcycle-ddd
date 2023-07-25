import IEventHandler from "../../../@shared/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default class sendConsoleWhenCustomerIsCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
