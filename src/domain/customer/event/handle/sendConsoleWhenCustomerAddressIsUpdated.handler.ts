import IEventHandler from "../../../@shared/event/eventHandler.interface";
import CustomerAddressUpdatedEvent from "../customerAddressUpdatedEvent.event";

export default class sendConsoleWhenCustomerAddressIsUpdatedHandler
  implements IEventHandler<CustomerAddressUpdatedEvent>
{
  handle(event: CustomerAddressUpdatedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${event.eventData.address.toString()}`
    );
  }
}
