import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {PlaneComponent} from './graph/components/plane/plane.component';
import {StoreModule} from '@ngrx/store';
import {AxisComponent} from './graph/components/axis/axis.component';
import {appReducer} from "./reducers/app.reducer";
import {ViewService} from "./graph/services/view.service";
import { NumberPipe } from './graph/pipes/number.pipe';
import { FunctionComponent } from './graph/components/function/function.component';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { LocalErrorsComponent } from './pages/local-errors/local-errors.component';
import { GlobalErrorsComponent } from './pages/global-errors/global-errors.component';
import { LegendComponent } from './graph/components/legend/legend.component';
import { ZoomControlComponent } from './graph/components/zoom-control/zoom-control.component';
import {NgxSliderModule} from "@angular-slider/ngx-slider";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaneComponent,
    AxisComponent,
    NumberPipe,
    FunctionComponent,
    SolutionsComponent,
    LocalErrorsComponent,
    GlobalErrorsComponent,
    LegendComponent,
    ZoomControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    StoreModule.forRoot({'appReducer': appReducer}, {}),
    ReactiveFormsModule,
    NgxSliderModule,
    /*    StoreDevtoolsModule.instrument({})*/
  ],
  providers: [ViewService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(protected viewService: ViewService) {}
}
