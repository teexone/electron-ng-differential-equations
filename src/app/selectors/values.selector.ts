import {createSelector} from "@ngrx/store";
import {AppStateSelector} from "./app-state.selector";

export const valuesSelector = createSelector(AppStateSelector, state => { return {
  values: state.values
}})
