import type { PipeTransform } from '@angular/core'
import { Pipe } from '@angular/core'
import { fixed } from '@/app/shared/constants/constants'

@Pipe({
  name: 'addDollarPipe',
  standalone: true,
})
export class AddDollarPipePipe implements PipeTransform {
  public transform(value: number | string): string {
    if (value == null || value === '') return ''
    return typeof value === 'string' ? `$${parseInt(value).toFixed(fixed)}` : `$${value.toFixed(fixed)}`
  }
}
