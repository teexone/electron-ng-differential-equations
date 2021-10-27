import { Component, OnInit } from '@angular/core';
import {EulerApproximation} from "../../core/algorithms/euler";
import {HeunApproximation} from "../../core/algorithms/heun";
import {RK4Approximation} from "../../core/algorithms/rk4";
import {FunctionCalculatorService} from "../services/function-calculator.service";
import {NumericalApproximation} from "../../core/algorithms/complementary/numerical-approximation";

@Component({
  selector: 'app-global-errors',
  templateUrl: './global-errors.component.html',
  styleUrls: ['./global-errors.component.scss']
})
export class GlobalErrorsComponent implements OnInit {


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
      'id': 'euler',
      'title': "Euler's Method Local Error",
      'color': this.colors['euler'],
    },
    {
      'id': 'heun',
      'title': "Improved Euler's Method Local Error",
      'color': this.colors['heun'],
    },
    {
      'id': 'rk4',
      'title': "Runge-Kutta Method Local Error",
      'color': this.colors['rk4'],
    }
  ]

  getPlotData() {
    return [
      {
        data: this.getGlobalError(new EulerApproximation(), 'euler'),
        range: this.getRange(),
        styles: {'stroke': this.colors['euler']},
        discrete: true
      },
      {
        data: this.getGlobalError(new HeunApproximation(), 'heun'),
        range: this.getRange(),
        styles: {'stroke': this.colors['heun']},
        discrete: true
      },
      {
        data: this.getGlobalError(new RK4Approximation(), 'rk4'),
        range: this.getRange(),
        styles: {'stroke': this.colors['rk4']},
        discrete: true
      },
    ]
  }

  getGlobalError(approximation: NumericalApproximation, approximationAlias: string) {
    if (this.hidden[approximationAlias])
      return [];
    return this.functionCalculator.getGlobalError(approximation, approximationAlias);
  }


  getRange() {
    return this.functionCalculator.getRange();
  }

  constructor(protected functionCalculator: FunctionCalculatorService) { }

  ngOnInit(): void {
  }

}
