import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppStateSelector} from "../../../selectors/app-state.selector";
import {changeViewAction} from "../../../actions/app.actions";
import {Point2} from "../../../core/geometry/classes/point2";
import {Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrls: ['./zoom-control.component.scss']
})
export class ZoomControlComponent implements OnInit {

  yScale: number = 1;
  xScale: number = 1;

  horizontalSliderOptions: Options = {
    floor: 0.0001,
    ceil: 10000,
    step: 0.0001,
  }

  verticalSliderOptions: Options = {
    floor: 0.0001,
    ceil: 10000,
    step: 0.0001,
    vertical: true
  }

  protected viewTransform!: {
    scale: Point2,
    shift: Point2
  };

  constructor(protected store: Store) {
    this.store.select(AppStateSelector).subscribe(state => {
      this.yScale = 1 / state.viewTransform.scale.y;
      this.xScale = 1 / state.viewTransform.scale.x;
      this.viewTransform = state.viewTransform;
    })
  }

  onValueChange() {
    this.store.dispatch(changeViewAction({
      newTransform: {
        shift: this.viewTransform.shift,
        scale: new Point2(1 / this.xScale, 1 / this.yScale)
      }
    }));
  }

  ngOnInit(): void {
  }

}
