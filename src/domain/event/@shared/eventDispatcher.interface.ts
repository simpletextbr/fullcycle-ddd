import IEvent from "./event.interface";
import IEventHandler from "./eventHandler.interface";

export default interface IEventDispatcher {
  notify(event: IEvent): void;
  register(event: string, callback: (event: IEventHandler) => void): void;
  unregister(event: string, callback: (event: IEventHandler) => void): void;
  unregisterAll(): void;
}
