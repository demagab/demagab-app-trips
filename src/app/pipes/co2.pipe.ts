import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'co2',
})
export class Co2Pipe implements PipeTransform {
  transform(value: number, unit: string = 'kg'): string {
    return value != null ? `${value} ${unit} CO2` : '-';
  }
}
