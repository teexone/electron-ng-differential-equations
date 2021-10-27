import {Component, Input, OnInit} from '@angular/core';
import {Point2} from "../../../core/geometry/classes/point2";
import {Store} from "@ngrx/store";
import {AppStateSelector} from "../../../selectors/app-state.selector";

@Component({
  selector: 'g [axis]',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.scss']
})
export class AxisComponent implements OnInit {

  @Input('origin') origin: Point2 = new Point2(0, 0);
  @Input('numbers') numbers: {number: number, value: number}[][] = [];
  @Input('delta') displayDelta: number = 15;
  @Input('length') length!: number;
  @Input('axis-line-style') axisLineStyle: {[key: string]: string} | null = null;
  @Input('axis-direction') direction?: 'y-axis' | 'x-axis';

  getNumbers(): {number: number, value: number}[][] {
    return this.numbers;
  }

  getAxisLinePath() {
    return this.direction == 'y-axis' ?
      `M ${this.origin.x} 0 V ${this.length}` : `M 0 ${this.origin.y} H ${this.length}`
  }

  getOriginShift(delta: number) {
      if (this.direction == 'x-axis') {
        return this.origin.add(new Point2(delta, 0));
      } else {
        return this.origin.add(new Point2(0, delta));
      }
  }

  constructor(protected store: Store) {
  }

  ngOnInit(): void {
  }

}
