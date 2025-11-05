import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'addDollarPipe',
  standalone: true,
})
export class AddDollarPipePipe implements PipeTransform {
  public transform(value: number | string): string {
    if (value == null || value === '') return '';
    return `$${value}`;
  }
}
