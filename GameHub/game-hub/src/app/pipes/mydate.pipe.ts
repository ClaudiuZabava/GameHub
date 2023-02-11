import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'myDate'
})
export class MyFunctionPipe implements PipeTransform {
    transform(value: any): string {
        return moment(value).add(-1, 'months').format('YYYY-MM-DD');
      }
}