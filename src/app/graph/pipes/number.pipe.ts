import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (Math.abs(value) > 10000 || Math.abs(value) < .00001) {
      return numeral(value).format('0.0e+0')
    } else return numeral(value).format('0.[00000]')
  }

}
