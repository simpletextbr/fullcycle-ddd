import IEventHandler from "../../@shared/eventHandler.interface";
import ProductCreatedEvent from "../productCreated.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`sending email to .......`);
  }
}
