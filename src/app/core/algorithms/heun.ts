import {ExplicitFunction2} from "../../graph/interfaces/explicit-function2";
import {Point2} from "../geometry/classes/point2";
import {NumericalApproximation} from "./complementary/numerical-approximation";
import {ApproximationException} from "./complementary/approximation-exception";
import {checkValue} from "./complementary/check-value";


export class HeunApproximation
  implements NumericalApproximation {
  approximate(f: ExplicitFunction2,
              n: number,
              initialValue: Point2,
              upperInterval: number): Point2[] | ApproximationException {
    let x = initialValue.x;
    let y = initialValue.y;
    let h = Math.abs(upperInterval - x) / n;
    let result: Point2[] = [new Point2(x, y)];
    while (Math.abs(x - upperInterval) >= 1E-6) {
      let x1 = x + h;
      let __y1 = y + h * f(x, y);
      let y1 = y + 0.5 * h * (f(x, y) + f(x1, __y1));
      if (!checkValue(y1)) {
        return ApproximationException.INVALID_VALUE_RECEIVED
      }
      result.push(new Point2(x1, y1));
      x = x1;
      y = y1;
    }

    return result;
  }

  approximateNextPoint(f: ExplicitFunction2, step: number, p: Point2): Point2 {
    return new Point2(
      p.x + step,
      p.y + 0.5 * step * (f(p.x, p.y) + f(p.x + step, p.y + step * f(p.x, p.y)))
    );
  }
}
