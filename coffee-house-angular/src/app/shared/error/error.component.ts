import { Component, inject, type OnInit, signal } from '@angular/core'
import { type ControlValueAccessor, NgControl } from '@angular/forms'
import { CUSTOM_ERRORS } from '@/app/shared/constants/custom-error.tokens'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements ControlValueAccessor, OnInit {
  protected readonly error = signal('')
  private readonly control = inject(NgControl, { self: true })
  private readonly errorMap = inject(CUSTOM_ERRORS)

  constructor() {
    this.control.valueAccessor = this
  }

  public ngOnInit(): void {
    const { control } = this.control
    control?.events.subscribe(() => {
      if (control?.invalid && control.errors && control.touched) {
        let error: string = this.errorMap[Object.keys(control.errors).at(0) ?? '']
        if (!error) {
          error = Object.values(control.errors).at(0) ?? ''
        }
        if (error) {
          this.error.set(error)
          return
        }
      } else {
        this.error.set('')
      }
    })
  }

  public writeValue(): void {}
  public registerOnChange(): void {}
  public registerOnTouched(): void {}
}
