import { Component, OnInit } from '@angular/core';
import {NumericalApproximation} from "../../core/algorithms/complementary/numerical-approximation";
import {FunctionCalculatorService} from "../services/function-calculator.service";
import {EulerApproximation} from "../../core/algorithms/euler";
import {HeunApproximation} from "../../core/algorithms/heun";
import {RK4Approximation} from "../../core/algorithms/rk4";

@Component({
  selector: 'app-local-errors',
  templateUrl: './local-errors.component.html',
  styleUrls: ['./local-errors.component.scss']
})
export class LocalErrorsComponent implements OnInit {


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


  getLocalError(approximation: NumericalApproximation, approximationAlias: string) {
    if (this.hidden[approximationAlias])
      return [];
    return this.functionCalculator.getLocalError(approximation, approximationAlias);
  }

  getRange() {
    return this.functionCalculator.getRange();
  }

  getPlotData() {
    return [
      {
        data: this.getLocalError(new EulerApproximation(), 'euler'),
        range: this.getRange(),
        styles: {'stroke': this.colors['euler']},
        discrete: true
      },
      {
        data: this.getLocalError(new HeunApproximation(), 'heun'),
        range: this.getRange(),
        styles: {'stroke': this.colors['heun']},
        discrete: true
      },
      {
        data: this.getLocalError(new RK4Approximation(), 'rk4'),
        range: this.getRange(),
        styles: {'stroke': this.colors['rk4']},
        discrete: true
      },
    ]
  }
  constructor(protected functionCalculator: FunctionCalculatorService) { }

  ngOnInit(): void {
  }

}
