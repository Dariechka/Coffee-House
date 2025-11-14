import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { builtInError } from '@/app/shared/constants/constants'

export function loginIsValid(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pattern = /^[A-Za-z][A-Za-z0-9-\s]{2,}$/
    const value: string | null = control.value
    if (value === null) {
      return null
    }
    const isValid = pattern.test(value)
    return !isValid ? { loginIsValid: builtInError.login } : null
  }
}

export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pattern = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{6,}$/
    const value: string | null = control.value
    if (value === null) {
      return null
    }
    const isValid = pattern.test(value)
    return !isValid ? { passwordIsValid: builtInError.password } : null
  }
}

export function createSamePasswordValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')

    if (password?.value === confirmPassword?.value && password?.value !== '') {
      confirmPassword?.setErrors(null)
      return null
    } else {
      confirmPassword?.setErrors({ loginIsValid: builtInError.confirmPassword })
      return { confirmPasswordIsValid: builtInError.confirmPassword }
    }
  }
}

export function houseNumberValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string | null = control.value
    if (value === null) {
      return null
    }
    const isValid = +value > 1
    return !isValid ? { houseNumberIsValid: builtInError.house } : null
  }
}
