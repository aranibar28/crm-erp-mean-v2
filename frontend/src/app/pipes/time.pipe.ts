import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return 'hace mucho tiempo';
    }
    let time = (Date.now() - Date.parse(value)) / 1000;
    if (time < 10) {
      return 'justo ahora';
    } else if (time < 60) {
      return 'hace un momento';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' segundo', ' minuto', ' hora', ' día', ' month', ' año'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';
    return 'hace ' + Math.floor(time) + string[i] + plural;
  }
}
