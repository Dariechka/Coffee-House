import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import { type SignInRequest } from '../../../typing/types.ts'
import { InputContainerComponent } from '../../registration-page/registration-form/input-component/input-component.ts'
import { userLogin } from '../../../share/api.ts'
import ErrorMessage from '../../../components/error-message/error-message.ts'
import { router } from '../../../app.ts'
import { Page } from '../../../router/pages.ts'
import { state } from '../../../state/state.ts'

export default class SignInForm extends HtmlElementComponent<'form'> {
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
  private submitButton: HtmlElementComponent<'button'> = this.createSubmitButton()
  private formData: SignInRequest = {
    login: '',
    password: '',
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
      classes: ['sign-in__form'],
    })
    this.mountChildren(this.loginInput, this.passwordInput, this.submitButton)
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
  private passwordValidation(value: string): string | undefined {
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

  private checkFormForValid(): boolean {
    return Object.values(this.formData).filter((value) => value === '').length === 0
  }

  private makeButtonAvailable(): void {
    if (this.checkFormForValid()) {
      this.submitButton.removeAttribute('disabled')
    } else {
      this.submitButton.addAttribute('disabled', '')
    }
  }

  private async sendDataToServer(event: Event): Promise<void> {
    event.preventDefault()
    if (!this.checkFormForValid()) {
      return
    }
    const response = await userLogin(this.formData)
    if (typeof response === 'string') {
      this.mountChildren(new ErrorMessage('Incorrect login or password'))
    } else {
      state.login(response.data.access_token, response.data.user.id)
      router.navigate(Page.MAIN)
    }
  }

  private createSubmitButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      text: 'Sign in',
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
      classes: ['registration__submit', 'sign-in__submit'],
    })
  }
}
