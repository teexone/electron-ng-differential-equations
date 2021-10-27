import {ExplicitFunction} from "./explicit-function";
import {Point2} from "../../core/geometry/classes/point2";


export interface PlotData {
  range: [number, number]
  data: ExplicitFunction | Point2[],
  discrete?: boolean;
  styles: {
    [key: string]: string
  }

}
