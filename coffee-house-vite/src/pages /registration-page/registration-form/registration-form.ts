import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import { InputContainerComponent } from './input-component/input-component.ts'
import { RadioComponent } from './radio-component/radio-component.ts'
import type { City, RegistrationResponse } from '../../../typing/types.ts'
import { SelectComponent } from './select-component/select-component.ts'

export default class RegistrationForm extends HtmlElementComponent<'form'> {
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
    onUpdate: (value: string) => this.getHouseNumber(value),
    classes: ['registration__form_input_small'],
    name: 'House Number',
    type: 'number',
    min: '2',
  })
  private payBuyInput: RadioComponent = new RadioComponent((value: 'card' | 'cash') => this.getPaymentMethod(value))

  private formData: RegistrationResponse = {
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
      classes: ['registration__form'],
    })
    this.mountChildren(this.createTopRowForm(), this.createLowRowForm(), this.submitButton)
  }

  private loginValidation(value: string): void {
    console.log(value)
  }

  private confirmPasswordValidation(value: string): void {
    console.log(value)
  }

  private passwordValidation(value: string): void {
    console.log(value)
  }

  private getCityValue(city: City): void {
    this.formData.city = city
    this.streetInput.changeOptions(city)
  }

  private getStreetValue(street: string): void {
    this.formData.street = street
  }

  private getHouseNumber(value: string): void {
    this.formData.houseNumber = +value
  }

  private getPaymentMethod(value: 'card' | 'cash'): void {
    this.formData.paymentMethod = value
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
