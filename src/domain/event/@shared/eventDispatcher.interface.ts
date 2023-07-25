import IEvent from "./event.interface";
import IEventHandler from "./eventHandler.interface";

export default interface IEventDispatcher {
  notify(event: IEvent): void;
  register(event: string, eventHandler: IEventHandler): void;
  unregister(event: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}
