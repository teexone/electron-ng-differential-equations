import {Addable} from "../../math/interfaces/addable";
import {Scalable} from "../../math/interfaces/scalable";

export class Point2 implements Addable, Scalable {
  add(b: Point2): Point2 {
    return new Point2(this._x + b._x, this._y + b._y);
  }

  times(a: number, b = a): Point2 {
    return new Point2(a * this._x, b * this._y);
  }

  apply(fn: (x: number) => number) {
    return new Point2(fn(this.x), fn(this.y));
  }

  constructor(_x: number, _y:  number) {
    this._x = _x;
    this._y = _y;
  }

  private _x: number;

  get x(): number {
    return this._x;
  }

  set x(_x: number) {
    this._x = _x;
  }

  private _y: number;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

}
