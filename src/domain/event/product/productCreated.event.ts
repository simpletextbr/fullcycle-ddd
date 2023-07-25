import IEvent from "../../../domain/event/@shared/event.interface";

export default class ProductCreatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(data: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = data;
  }
}
