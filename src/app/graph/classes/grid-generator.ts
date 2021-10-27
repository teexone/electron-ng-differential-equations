import * as _ from "lodash";
import {Point2} from "../../core/geometry/classes/point2";

export class GridGenerator {
  produceSVGPath(options: {
    points: number[],
    axis: 'y-axis' | 'x-axis'
  }) {
    let str = '';
    if (options.axis == 'x-axis') {
      for (let point of options.points) {
        str += `M ${point} 0 V 100000 `
      }
    } else if (options.axis == 'y-axis') {
      for (let point of options.points) {
        str += `M 0 ${point} H 100000 `
      }
    }
    return str;
  }
}

