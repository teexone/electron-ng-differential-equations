import { Injectable } from '@angular/core';
import {NumericalApproximation} from "../../core/algorithms/complementary/numerical-approximation";
import * as _ from "lodash";
import {Point2} from "../../core/geometry/classes/point2";
import {ApproximationException} from "../../core/algorithms/complementary/approximation-exception";
import {ExplicitFunction2} from "../../graph/interfaces/explicit-function2";
import {AdjustableValues} from "../../interfaces/adjustable-values";
import {Store} from "@ngrx/store";
import {AppStateSelector} from "../../selectors/app-state.selector";
import {take} from "rxjs/operators";
import {AppState} from "../../reducers/app.reducer";
import {valuesSelector} from "../../selectors/values.selector";

@Injectable({
  providedIn: 'root'
})
export class FunctionCalculatorService {

  protected _cache: { [key: string]: any | any[] } = {};

  protected _constant?: ExplicitFunction2;
  protected _derivative?: ExplicitFunction2;
  protected _solution?: ExplicitFunction2;
  protected _values?: AdjustableValues;

  getApproximation(approximation: NumericalApproximation, cacheCell: string, values = this._values) {

    if (values && this._derivative) {
      if (!_.isEqual(_.get(this._cache, `${cacheCell}.values`), values)) {
        const result = approximation.approximate(this._derivative, values.N, new Point2(values.x0, values.y0), values.X);
        if (result == ApproximationException.INVALID_VALUE_RECEIVED) {
          return [];
        }
        _.set(this._cache, `${cacheCell}.data`, result)
        _.set(this._cache, `${cacheCell}.values`, _.cloneDeep(values));
      }
      return (_.get(this._cache, `${cacheCell}.data`) as any) as Point2[];
    } else return [];
  }


  constructor(protected store: Store) {
    this.store.select(AppStateSelector)
      .pipe(take(1))
      .subscribe((state: AppState) => {
        this._values = state.values;
        this._derivative = state.derivative;
        this._solution = state.solution;
        this._constant = state.C;
      });
    this.store.select(valuesSelector)
      .subscribe(state => {
        this._values = state.values;
      });
  }

  getDefiniteSolution() {
    const C = this._constant!(this._values!.x0, this._values!.y0)
    return (x: number) => this._solution!(x, C);
  }

  getRange(): [number, number] {
    return [this._values!.x0, this._values!.X];
  }

  getLocalError(approximation: NumericalApproximation, approximationAlias: string, values = this._values): Point2[] {
    if (!this._derivative)
      return [];
    const solution = this.getDefiniteSolution();
    const approx = this.getApproximation(approximation, approximationAlias, values);
    if (approx.length == 0)
      return [];
    let result = [new Point2(approx[0].x, 0)];
    for (let i = 1; i < approx.length; ++i) {
      let base = new Point2(approx[i - 1].x, solution(approx[i - 1].x));
      let dx = approx[i].x - approx[i - 1].x;
      let approximated = approximation.approximateNextPoint(this._derivative, dx, base);
      let exact = new Point2(approx[i].x, solution(approx[i].x));
      result.push(new Point2(approximated.x, Math.abs(approximated.y - exact.y)));
    }
    return result;
  }

  getGlobalError(approximation: NumericalApproximation, approximationAlias: string): Point2[] {
    if (!this._values)
      return [];
    const result = [];
    for (let i = this._values?.n0; i <= this._values?.N; ++i) {
      const values = {
        ...this._values,
        N: i
      }
      const error = this.getLocalError(approximation, approximationAlias, values);
      result.push(new Point2(i, _.maxBy(error, x => x.y)!.y));
    }
    return result;
  }
}
