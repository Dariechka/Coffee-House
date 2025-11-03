import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ErrorComponent } from '@/app/shared/error/error.component';

import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  createSamePasswordValidator,
  houseNumberValidation,
  loginIsValid,
  passwordValidation,
} from '@/app/shared/validation/validation-funtions';
import { type City, streets } from '@/app/shared/types/types';
import { toSignal } from '@angular/core/rxjs-interop';
import { isCity } from '@/app/shared/guards/guards';

@Component({
  selector: 'app-registration-page',
  imports: [ErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage {
  protected fb = inject(NonNullableFormBuilder);
  protected City: Array<City> = ['New York', 'San Francisco', 'Chicago'];

  protected registrationForm = this.fb.group(
    {
      login: this.fb.control('', {
        validators: [Validators.required, loginIsValid()],
      }),
      password: this.fb.control('', {
        validators: [Validators.required, passwordValidation()],
      }),
      confirmPassword: this.fb.control('', {
        validators: [Validators.required],
      }),
      city: this.fb.control('', {
        validators: [Validators.required],
      }),
      street: this.fb.control('', {
        validators: [Validators.required],
      }),
      houseNumber: this.fb.control('', {
        validators: [Validators.required, houseNumberValidation()],
      }),
      payment: this.fb.control<'cash' | 'card'>('cash'),
    },
    {
      validators: [createSamePasswordValidator()],
    }
  );

  protected selectedCity = toSignal(this.registrationForm.controls.city.valueChanges, {
    initialValue: this.registrationForm.controls.city.value,
  });

  protected streets = computed(() => {
    const city = this.selectedCity();
    if (isCity(city)) {
      return streets[city];
    }
    return [];
  });
}
