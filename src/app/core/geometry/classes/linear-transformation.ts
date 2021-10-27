import {LinearFunction} from "./linear-function";
import {MathFunction} from "../../math/math-function";
import {Addable} from "../../math/interfaces/addable";
import {Scalable} from "../../math/interfaces/scalable";

export class LinearTransformation<T extends Addable & Scalable> {
  constructor(scalar: Scalable, shift: T) {
    this._scalar = scalar;
    this._shift = shift;
  }

  protected _scalar: Scalable;

  get scalar(): Scalable {
    return this._scalar;
  }

  set scalar(value: Scalable) {
    this._scalar = value;
    this._updateFunction();
  }

  protected _shift: T;

  get shift(): T {
    return this._shift;
  }

  set shift(value: T) {
    this._shift = value;
    this._updateFunction();

  }

  evaluate<T extends Scalable & Addable>(subject: T): T {
    return (subject.times(this._scalar) as Scalable & Addable).add(this.shift) as T;
  }

  evaluateShift<T extends Scalable & Addable>(subject: T): T {
    return (subject.add(this._shift)) as T;
  }

  protected _fn: MathFunction<Scalable & Addable> = x => x;

  protected _updateFunction(): void {
    this._fn = LinearFunction(this._scalar, this._shift);
  }
}
