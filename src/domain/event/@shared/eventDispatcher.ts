import IEvent from "./event.interface";
import IEventDispatcher from "./eventDispatcher.interface";
import IEventHandler from "./eventHandler.interface";

export default class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(event: string, eventHandler: IEventHandler): void {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = new Array<IEventHandler>();
    }

    this.eventHandlers[event].push(eventHandler);
  }

  unregister(event: string, eventHandler: IEventHandler): void {
    if (this.eventHandlers[event]) {
      const index = this.eventHandlers[event].indexOf(eventHandler);
      if (index > -1) {
        this.eventHandlers[event].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
