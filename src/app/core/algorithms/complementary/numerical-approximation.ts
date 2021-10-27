import {ApproximationException} from "./approximation-exception";
import {ExplicitFunction2} from "../../../graph/interfaces/explicit-function2";
import {Point2} from "../../geometry/classes/point2";

export interface NumericalApproximation {
  approximate(f: ExplicitFunction2, n: number, initialValue: Point2, upperInterval: number):
    Point2[] | ApproximationException

  approximateNextPoint(f: ExplicitFunction2, step: number, p: Point2): Point2;
}2
