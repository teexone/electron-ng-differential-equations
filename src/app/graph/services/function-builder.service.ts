import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as numeral from 'numeral';
import {Point2} from "../../core/geometry/classes/point2";
import {ExplicitFunction} from "../interfaces/explicit-function";
import {FunctionPoint2} from "../interfaces/function-point2";

@Injectable({
  providedIn: 'root'
})
export class FunctionBuilderService {

  constructor() {
  }

  buildExplicitFunction(fn: ExplicitFunction, options: {
    interval?: number
    smoothness?: number,
    range: [number, number]
  }): FunctionPoint2[] {
    let {interval, range, smoothness} = {
      smoothness: .005,
      ...options,
    };
    let result: FunctionPoint2[] = [];
    interval = interval ?? (range[1] - range[0]) / 1e3;
    for (let i = range[0]; i <= range[1]; i += interval) {
      result.push(new Point2(i, fn(i)));
    }
    return result;
  }


  buildSVGPath(points: FunctionPoint2[]) {
    if (points.length == 0)
      return '';
    let start = 0;
    while (!(points[start] instanceof Point2))
      ++start;
    let path = `M ${(<Point2>points[start]).x} ${(<Point2>points[start]).y} `;
    for (let i = 1; i < points.length; ++i) {
      if (points[i] instanceof Point2) {
        path += `L ${(<Point2>points[i]).x} ${(<Point2>points[i]).y}`;
      } else {
        while (i < points.length && !(points[i] instanceof Point2))
          ++i;
        if (points[i] instanceof Point2) {
          path += `M ${(<Point2>points[i]).x} ${(<Point2>points[i]).y}`;
        }
      }
    }
    return path;
  }
}
