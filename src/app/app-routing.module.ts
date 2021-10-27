import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SolutionsComponent} from "./pages/solutions/solutions.component";
import {LocalErrorsComponent} from "./pages/local-errors/local-errors.component";
import {GlobalErrorsComponent} from "./pages/global-errors/global-errors.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'solutions', pathMatch: 'full'},
      {path: 'solutions', component: SolutionsComponent},
      {path: 'lte', component: LocalErrorsComponent},
      {path: 'gte', component: GlobalErrorsComponent}
    ])
  ]
})
export class AppRoutingModule { }
