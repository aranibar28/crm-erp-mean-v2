import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zfill',
})
export class ZfillPipe implements PipeTransform {
  transform(number: any, ...width: any[]): unknown {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = '0';

    if (width[0] <= length) {
      if (number < 0) {
        return '-' + numberOutput.toString();
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return '-' + zero.repeat(width[0] - length) + numberOutput.toString();
      } else {
        return zero.repeat(width[0] - length) + numberOutput.toString();
      }
    }
  }
}
