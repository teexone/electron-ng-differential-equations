import {createReducer, on} from '@ngrx/store';
import {LinearTransformation} from "../core/geometry/classes/linear-transformation";
import {changeValuesAction, changeViewAction} from "../actions/app.actions";
import * as _ from 'lodash';
import {Point2} from "../core/geometry/classes/point2";
import {AdjustableValues} from "../interfaces/adjustable-values";
import {ExplicitFunction2} from "../graph/interfaces/explicit-function2";


export const appReducerFeatureKey = 'appReducer';


export interface AppState {
  viewTransform: {
    scale: Point2,
    shift: Point2
  }
  values: AdjustableValues,
  derivative: ExplicitFunction2,
  solution: ExplicitFunction2,
  C: ExplicitFunction2,
}

export const initialState: AppState = {
  viewTransform: {
    scale: new Point2(.25, .25),
    shift: new Point2(600, 600),
  },
  values: {
    y0: 2,
    x0: 1,
    X: 6,
    N: 10,
    n0: 1,
  },
  derivative: ((x, y) => (1 + y / x) * Math.log((x + y) / x) + y / x),
  solution: ((x, c) => x * (Math.exp(x * c) - 1)),
  C: ((x, y) => Math.log(1 + y / x) / x)
};


export const appReducer = createReducer(
  initialState,
  on(changeViewAction, (state: AppState, p: {newTransform: {
      scale: Point2,
      shift: Point2
    }}) => {
    const _state = _.cloneDeep(state);
    _state.viewTransform = p.newTransform;
    return _state;
  }),
  on(changeValuesAction, (state: AppState, p: {values: AdjustableValues}) => {
    state = _.cloneDeep(state);
    state.values = p.values;
    return state;
  })
);

