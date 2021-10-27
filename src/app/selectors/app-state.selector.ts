import {createFeatureSelector} from "@ngrx/store";
import {AppState} from "../reducers/app.reducer";

export const AppStateSelector = createFeatureSelector<AppState>('appReducer');
