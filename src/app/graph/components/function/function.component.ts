import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {Point2} from "../../../core/geometry/classes/point2";
import {FunctionBuilderService} from "../../services/function-builder.service";
import {ExplicitFunction} from "../../interfaces/explicit-function";
import {FunctionPoint2} from "../../interfaces/function-point2";

@Component({
  selector: 'g [function]',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.scss']
})
export class FunctionComponent implements OnInit {

  @Input('function') data: ((x: number) => number) | Point2[] = [];
  @Input('interval') interval?: number;
  @Input('origin') origin: Point2 = new Point2(0, 0);
  @Input('range') range: [number, number] = [0, 0];
  @Input('scale') scale: Point2 = new Point2(1, 1);
  @Input('styles') styles: { [key: string]: string } = {};
  @Input('discrete') discrete: boolean = false;

  _randomID: string;
  protected _cachedPointData: FunctionPoint2[] = [];
  protected _dirty = true;
  constructor(protected builder: FunctionBuilderService, protected cd: ChangeDetectorRef) {
    this._randomID = Math.ceil(Math.random() * 1E6).toString();
  }

  getPath() {
    if (_.isFunction(this.data)) {
      if (this._dirty) {
        this.calculateExplicitFunction(this.data);
        this._dirty = false;
      }
    }
    return this.builder.buildSVGPath(this._cachedPointData.map(p =>
      p instanceof Point2 ? this.getPlanePoint(new Point2(p.x, -p.y)) : p));
  }

  ngAfterViewInit() {
    if (!_.isFunction(this.data)) {
      this._cachedPointData = this.data;
    }
  }

  ngOnInit(): void {

  }

  replaceFunction(fn: ExplicitFunction) {
    this.data = fn;
    this._dirty = true;
    this.cd.detectChanges();
  }

  protected calculateExplicitFunction(fn: ExplicitFunction) {
    this._cachedPointData = this.builder.buildExplicitFunction(fn, {
      range: this.range,
      interval: this.interval
    });

  }

  protected getPlanePoint(point: Point2) {
    return point.times(this.scale.x, this.scale.y).add(this.origin);
  }

}
