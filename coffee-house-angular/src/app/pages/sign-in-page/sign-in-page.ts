import { type AfterViewInit, ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginIsValid, passwordValidation } from '@/app/shared/validation/validation-funtions';
import { ErrorComponent } from '@/app/shared/error/error.component';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { Toggler } from '@/app/shared/server-error-message/server-error-message';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@/app/shared/service/api-service/api-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { isUserResponse } from '@/app/shared/guards/guards';
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-sign-in-page',
  imports: [ReactiveFormsModule, ErrorComponent, IconComponent, Toggler],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage implements AfterViewInit {
  protected route = inject(ActivatedRoute);
  protected viewportScroller = inject(ViewportScroller);
  protected fb = inject(NonNullableFormBuilder);
  protected serverError = signal<string>('');
  protected readonly localStorageService = inject(LocalStorageService);
  protected readonly api = inject(ApiService);
  protected readonly router = inject(Router);

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }

  protected signInForm = this.fb.group({
    login: this.fb.control('', {
      validators: [Validators.required, loginIsValid()],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, passwordValidation()],
    }),
  });

  protected disabledButton = computed(() => {
    return this.formStatus() !== 'VALID';
  });

  protected formStatus = toSignal(this.signInForm.statusChanges, {
    initialValue: this.signInForm.status,
  });

  protected signIn(): void {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) {
      return;
    }

    this.api.userLogin(this.signInForm.getRawValue()).subscribe((result) => {
      if (isUserResponse(result)) {
        this.localStorageService.login(result.data.access_token, result.data.user.id);
        this.goToMainPage();
      } else {
        this.serverError.set(result);
      }
    });
  }

  private goToMainPage(): void {
    this.router.navigate(['/main']).then();
  }
}
