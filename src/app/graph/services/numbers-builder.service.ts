import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumbersBuilderService {

  buildLevels(config: {
    epsilon: number,
    eta: number,
    delta: number,
    range: [number, number]
  }) {
    let {eta, epsilon, delta, range} = config;
    let base = Math.pow(epsilon, -Math.ceil(Math.log(eta)/Math.log(epsilon)));
    const result = [];
    for (let i = base; eta * delta * i <= range[1] || range[0] <= -eta * delta * i ; i += base) {
      if (eta * delta * i <= range[1]) {
        result.push({number: i, value: eta * delta * i});
      }
      if (range[0] <= eta * delta * i) {
        result.push({number: -i, value: -eta * delta * i})
      }
    }
    return [result];
  }
  constructor() { }
}
