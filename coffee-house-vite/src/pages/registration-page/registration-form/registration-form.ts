import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import { InputContainerComponent } from './input-component/input-component.ts'
import { RadioComponent } from './radio-component/radio-component.ts'
import { type City, type RegistrationRequest } from '../../../typing/types.ts'
import { SelectComponent } from './select-component/select-component.ts'
import { userRegistration } from '../../../share/api.ts'
import ErrorMessage from '../../../components/error-message/error-message.ts'
import { router } from '../../../app.ts'
import { Page } from '../../../router/pages.ts'

export default class RegistrationForm extends HtmlElementComponent<'form'> {
  private readonly errorMessage: ErrorMessage = new ErrorMessage('')
  private submitButton: HtmlElementComponent<'button'> = this.createSubmitButton()
  private loginInput: InputContainerComponent = new InputContainerComponent({
    onUpdate: (value: string) => this.loginValidation(value),
    classes: [],
    name: 'Login',
    type: 'text',
  })
  private passwordInput: InputContainerComponent = new InputContainerComponent({
    onUpdate: (value: string) => this.passwordValidation(value),
    classes: [],
    name: 'Password',
    type: 'password',
  })
  private confirmPasswordInput: InputContainerComponent = new InputContainerComponent({
    onUpdate: (value: string) => this.confirmPasswordValidation(value),
    classes: [],
    name: 'Confirm Password',
    type: 'password',
  })
  private cityInput: SelectComponent = new SelectComponent({
    name: 'city',
    CityOnChange: (city: City) => this.getCityValue(city),
  })
  private streetInput: SelectComponent = new SelectComponent({
    name: 'street',
    nameOfCity: 'New York',
    StreetOnChange: (street: string) => this.getStreetValue(street),
  })
  private houseNumberInput: InputContainerComponent = new InputContainerComponent({
    onUpdate: (value: string): string | undefined => this.getHouseNumber(value),
    classes: ['registration__form_input_small'],
    name: 'House Number',
    type: 'number',
    min: '0',
  })
  private payBuyInput: RadioComponent = new RadioComponent((value: 'card' | 'cash') => this.getPaymentMethod(value))

  private password: string = ''
  private confirmPassword: string = ''

  private formData: RegistrationRequest = {
    login: '',
    password: '',
    confirmPassword: '',
    city: '',
    street: '',
    houseNumber: 0,
    paymentMethod: 'cash',
  }

  constructor() {
    super({
      tag: 'form',
      listeners: [
        {
          type: 'submit',
          value: async (event: Event): Promise<void> => this.sendDataToServer(event),
        },
      ],
      classes: ['registration__form'],
    })
    this.mountChildren(this.createTopRowForm(), this.createLowRowForm(), this.submitButton)
  }

  private loginValidation(value: string): string | undefined {
    const pattern = /^[A-Za-z][A-Za-z0-9-\s]{2,}$/
    if (pattern.test(value)) {
      this.formData.login = value
      this.makeButtonAvailable()
    } else {
      this.formData.login = ''
      this.makeButtonAvailable()
      return 'At least 3 characters, start with a letter, only English letters'
    }
  }
  private confirmPasswordValidation(value?: string): string | undefined {
    if (value) {
      this.confirmPassword = value
    }
    if (this.password === this.confirmPassword && this.confirmPassword !== '') {
      this.formData.confirmPassword = this.confirmPassword
      this.makeButtonAvailable()
    } else {
      this.formData.confirmPassword = ''
      this.makeButtonAvailable()
      const text = 'Password and Confirm Password must match'
      this.confirmPasswordInput.changeClass('registration__form_item_error', false, text)
      return text
    }
  }
  private passwordValidation(value: string): string | undefined {
    this.password = value
    this.confirmPasswordValidation()
    const pattern = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{6,}$/
    if (pattern.test(value)) {
      this.formData.password = value
      this.makeButtonAvailable()
    } else {
      this.formData.password = ''
      this.makeButtonAvailable()
      return 'At least 6 characters and at least 1 special character'
    }
  }
  private getCityValue(city: City): void {
    this.formData.street = ''
    this.formData.city = city
    this.streetInput.changeOptions(city)
    this.makeButtonAvailable()
  }
  private getStreetValue(street: string): void {
    this.formData.street = street
    this.makeButtonAvailable()
  }
  private getHouseNumber(value: string): string | undefined {
    this.formData.houseNumber = 0
    if (+value > 1) {
      this.formData.houseNumber = +value
      this.makeButtonAvailable()
    } else {
      this.formData.houseNumber = 0
      this.makeButtonAvailable()
      return 'Value must be greater than 1'
    }
  }
  private getPaymentMethod(value: 'card' | 'cash'): void {
    this.formData.paymentMethod = value
  }

  private checkForValidForm(): boolean {
    return (
      Object.values(this.formData).filter((value) => value === 0).length === 0 &&
      Object.values(this.formData).filter((value) => value === '').length === 0
    )
  }

  private makeButtonAvailable(): void {
    if (this.checkForValidForm()) {
      this.submitButton.removeAttribute('disabled')
    } else {
      this.submitButton.addAttribute('disabled', '')
    }
  }

  private async sendDataToServer(event: Event): Promise<void> {
    event.preventDefault()
    if (!this.checkForValidForm()) {
      return
    }
    this.errorMessage.unmount()
    const response = await userRegistration(this.formData)
    if (typeof response === 'string') {
      this.errorMessage.changeMessage(response)
      this.mountChildren(this.errorMessage)
    } else {
      router.navigate(Page.SIGN_IN)
    }
  }

  private createSubmitButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      text: 'Registration',
      attributes: [
        {
          name: 'type',
          value: 'submit',
        },
        {
          name: 'disabled',
          value: '',
        },
      ],
      classes: ['registration__submit'],
    })
  }
  private createTopRowForm(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      children: [this.loginInput, this.passwordInput, this.confirmPasswordInput],
      classes: ['registration__form__top-row'],
    })
  }
  private createLowRowForm(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      children: [this.cityInput, this.streetInput, this.houseNumberInput, this.payBuyInput],
      classes: ['registration__form__low-row'],
    })
  }
}
