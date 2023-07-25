import IEvent from "./event.interface";
import IEventDispatcher from "./eventDispatcher.interface";
import IEventHandler from "./eventHandler.interface";

export default class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    throw new Error("Method not implemented.");
  }

  register(event: string, eventHandler: IEventHandler): void {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = new Array<IEventHandler>();
    }

    this.eventHandlers[event].push(eventHandler);
  }

  unregister(event: string, eventHandler: IEventHandler): void {
    throw new Error("Method not implemented.");
  }

  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}
