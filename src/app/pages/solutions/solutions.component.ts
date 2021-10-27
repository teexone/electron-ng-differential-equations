import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ExplicitFunction2} from "../../graph/interfaces/explicit-function2";
import {AdjustableValues} from "../../interfaces/adjustable-values";
import {AppStateSelector} from "../../selectors/app-state.selector";
import {AppState} from "../../reducers/app.reducer";
import {Store} from "@ngrx/store";
import {EulerApproximation} from "../../core/algorithms/euler";
import {Point2} from "../../core/geometry/classes/point2";
import {PlotData} from "../../graph/interfaces/plot-data";
import {RK4Approximation} from "../../core/algorithms/rk4";
import * as _ from 'lodash';
import {take} from "rxjs/operators";
import {valuesSelector} from "../../selectors/values.selector";
import {NumericalApproximation} from "../../core/algorithms/complementary/numerical-approximation";
import {ApproximationException} from "../../core/algorithms/complementary/approximation-exception";
import {changeValuesAction} from "../../actions/app.actions";
import {HeunApproximation} from "../../core/algorithms/heun";
import {FunctionCalculatorService} from "../services/function-calculator.service";

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements OnInit {

  colors = {
    'euler': 'green',
    'exact': 'purple',
    'heun': 'red',
    'rk4': 'orange',
  }

  hidden: any = {
    'euler': false,
    'exact': false,
    'heun': false,
    'rk4': false,
  }

  legend = [
    {
      'id': 'exact',
      'title': 'Exact Solution',
      'color': this.colors['exact'],
    },
    {
      'id': 'euler',
      'title': "Euler's Method",
      'color': this.colors['euler'],
    },
    {
      'id': 'heun',
      'title': "Improved Euler's Method",
      'color': this.colors['heun'],
    },
    {
      'id': 'rk4',
      'title': "Runge-Kutta Method",
      'color': this.colors['rk4'],
    }
  ]

  constructor(protected store: Store, protected calculator: FunctionCalculatorService, protected cd: ChangeDetectorRef) {

  }

  getApproximation(approximation: NumericalApproximation, approximationAlias: string) {
    if (this.hidden[approximationAlias])
      return [];
    else return this.calculator.getApproximation(approximation, approximationAlias);
  }

  getDefiniteSolution() {
    if (this.hidden['exact'])
      return [];
    return this.calculator.getDefiniteSolution();
  }

  getRange() {
    return this.calculator.getRange();
  }

  getPlotData(): PlotData[] {
    return [
      {
        data: this.getDefiniteSolution(),
        range: this.getRange(),
        styles: {'stroke': this.colors['exact']},
      },
      {
        data: this.getApproximation(new EulerApproximation(), 'euler'),
        range: this.getRange(),
        styles: {'stroke': this.colors['euler']},
        discrete: true
      },
      {
        data: this.getApproximation(new HeunApproximation(), 'heun'),
        range: this.getRange(),
        styles: {'stroke': this.colors['heun']},
        discrete: true
      },
      {
        data: this.getApproximation(new RK4Approximation(), 'rk4'),
        range: this.getRange(),
        styles: {'stroke': this.colors['rk4']},
        discrete: true
      },
    ]
  }



  ngAfterViewChecked() {
  }

  ngOnInit(): void {
  }

}
