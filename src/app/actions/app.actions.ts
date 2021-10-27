import {createAction, props} from '@ngrx/store';
import {Point2} from "../core/geometry/classes/point2";
import {AdjustableValues} from "../interfaces/adjustable-values";

export const changeViewAction = createAction(
  '[App - View] Change View',
  props<{
    newTransform: {
      scale: Point2,
      shift: Point2
    }
  }>()
);


export const changeValuesAction = createAction(
  '[App] Change Values',
  props<{ values: AdjustableValues }>()
);





