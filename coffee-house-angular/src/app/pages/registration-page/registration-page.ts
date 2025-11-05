import { type AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
import { isCity, isUserResponse } from '@/app/shared/guards/guards';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@/app/shared/service/api-service/api-service';
import { Toggler } from '@/app/shared/server-error-message/server-error-message';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-registration-page',
  imports: [ErrorComponent, FormsModule, ReactiveFormsModule, IconComponent, Toggler],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage implements AfterViewInit {
  protected route = inject(ActivatedRoute);
  protected viewportScroller = inject(ViewportScroller);
  protected fb = inject(NonNullableFormBuilder);
  protected City: Array<City> = ['New York', 'San Francisco', 'Chicago'];
  protected serverError = signal<string>('');
  protected readonly api = inject(ApiService);
  protected readonly router = inject(Router);

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
      paymentMethod: this.fb.control<'cash' | 'card'>('cash'),
    },
    {
      validators: [createSamePasswordValidator()],
    }
  );

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }

  protected formStatus = toSignal(this.registrationForm.statusChanges, {
    initialValue: this.registrationForm.status,
  });

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

  protected disabledButton = computed(() => {
    return this.formStatus() !== 'VALID';
  });

  protected signUp(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) {
      return;
    }

    const data = {
      ...this.registrationForm.getRawValue(),
      houseNumber: parseInt(this.registrationForm.controls.houseNumber.getRawValue(), 10),
    };

    this.api.userRegistration(data).subscribe((result) => {
      if (isUserResponse(result)) {
        this.goToSignInPage();
      } else {
        this.serverError.set(result);
      }
    });
  }

  private goToSignInPage(): void {
    this.router.navigate(['/sign-in']).then();
  }
}
