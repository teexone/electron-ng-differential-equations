import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  protected _events = new Subject<Event>();

  constructor() {
  }

  fire(event: Event) {
    this._events.next(event);
  }

  event<T extends Event>(key: string) {
    return this._events.asObservable().pipe(filter(event => event.type == key)).pipe(map(event => event as T));
  }
}
