import IEvent from "../@shared/event.interface";

export default class CustomerCreatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(data: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = data;
  }
}
