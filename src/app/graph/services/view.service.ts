import {Injectable} from '@angular/core';
import {Point2} from "../../core/geometry/classes/point2";
import {EventService} from "../../event/event.service";
import {Store} from "@ngrx/store";
import {LinearTransformation} from "../../core/geometry/classes/linear-transformation";
import {AppStateSelector} from "../../selectors/app-state.selector";
import {changeViewAction} from "../../actions/app.actions";
import {filter} from "rxjs/operators";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  center!: Point2;
  protected _motion = {
    active: false,
    previous: new Point2(0, 0),
    current: new Point2(0, 0),
  }
  protected _transformation!: {scale: Point2, shift: Point2};

  constructor(protected eventService: EventService, protected store: Store) {
    store.select(AppStateSelector).subscribe(state => this._transformation = state.viewTransform);

    eventService.event<MouseEvent>('mousedown').subscribe(event => {
      this._motion.active = true;
      this._motion.previous = this._motion.current = new Point2(event.clientX, event.clientY);
    });

    eventService.event<MouseEvent>('mousemove')
      .pipe(filter(() => this._motion.active))
      .subscribe(event => {
        this._motion.current = new Point2(event.clientX, event.clientY);
        const delta = this._motion.current.add(this._motion.previous.times(-1));
        store.dispatch(changeViewAction({
          newTransform: {
            scale: this._transformation.scale,
            shift: this._transformation.shift.add(delta)
          },
        }));
        this._motion.previous = this._motion.current;
      })

    eventService.event<MouseEvent>('mouseup').subscribe(event => {
      this._motion.active = false;
    })

    eventService.event<MouseEvent>('mouseleave').subscribe(event => {
      this._motion.active = false;
    })

    eventService.event<WheelEvent>('wheel').subscribe(event => {
      const currentScale = (this._transformation.scale)
      const newScale = currentScale.times(( 1 + (event.deltaY > 0 ? -0.1 : 0.1)))
        .apply(x => _.clamp(x, .0001, 10000));
      console.log(newScale)
      store.dispatch(changeViewAction({
        newTransform: {
          scale: newScale,
          shift: this._transformation.shift,
        }
      }));
    })
  }
}
