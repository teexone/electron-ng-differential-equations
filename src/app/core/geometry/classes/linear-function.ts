import {MathFunction} from "../../math/math-function";
import {Addable} from "../../math/interfaces/addable";
import {Scalable} from "../../math/interfaces/scalable";

export function LinearFunction<T>(a: Scalable, b: Addable): MathFunction<Scalable & Addable> {
  return ((x: Scalable & Addable) => (x.times(a) as Addable & Scalable).add(b)) as MathFunction<Scalable & Addable>;
}
