import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginIsValid, passwordValidation } from '@/app/shared/validation/validation-funtions';
import { ErrorComponent } from '@/app/shared/error/error.component';

@Component({
  selector: 'app-sign-in-page',
  imports: [ReactiveFormsModule, ErrorComponent],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPage {
  protected fb = inject(NonNullableFormBuilder);

  protected signInForm = this.fb.group({
    login: this.fb.control('', {
      validators: [Validators.required, loginIsValid()],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, passwordValidation()],
    }),
  });
}
