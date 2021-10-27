import {ExplicitFunction2} from "../../graph/interfaces/explicit-function2";
import {Point2} from "../geometry/classes/point2";
import {NumericalApproximation} from "./complementary/numerical-approximation";
import {ApproximationException} from "./complementary/approximation-exception";
import {checkValue} from "./complementary/check-value";

export class RK4Approximation implements NumericalApproximation {
  approximate(f: ExplicitFunction2,
              n: number,
              initialValue: Point2,
              upperInterval: number): Point2[] | ApproximationException {
    let x = initialValue.x;
    let y = initialValue.y;
    let h = Math.abs(upperInterval - x) / n;
    let result: Point2[] = [new Point2(x, y)];
    while (Math.abs(x - upperInterval) >= 1E-6) {
      let k1 = f(x, y);
      let k2 = f(x + 0.5 * h, y + 0.5 * h * k1);
      let k3 = f(x + 0.5 * h, y + 0.5 * h * k2);
      let k4 = f(x + h, y + h * k3);
      let x1 = x + h;
      let y1 = y + h * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      if (!checkValue(x1, y1)) {
        return ApproximationException.INVALID_VALUE_RECEIVED
      }
      result.push(new Point2(x1, y1));
      x = x1;
      y = y1;
    }

    return result;
  }

  approximateNextPoint(f: ExplicitFunction2, step: number, p: Point2): Point2 {
    let {x, y} = p;
    let h = step;
    let k1 = f(x, y);
    let k2 = f(x + 0.5 * h, y + 0.5 * h * k1);
    let k3 = f(x + 0.5 * h, y + 0.5 * h * k2);
    let k4 = f(x + h, y + h * k3);
    return new Point2(p.x + step, y + h * (k1 + 2 * k2 + 2 * k3 + k4) / 6);
  }
}
