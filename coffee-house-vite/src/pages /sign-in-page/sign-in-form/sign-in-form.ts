import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import { type SignInRequest } from '../../../typing/types.ts'
import { InputContainerComponent } from '../../registration-page/registration-form/input-component/input-component.ts'

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
  private formData: SignInRequest = {
    login: '',
    password: '',
  }

  constructor(private callback: (data: SignInRequest) => void) {
    super({
      tag: 'form',
      classes: ['sign-in__form'],
    })
    this.mountChildren(this.loginInput, this.passwordInput)
  }

  private loginValidation(value: string): string | undefined {
    this.formData.login = ''
    const pattern = /^[A-Za-z][A-Za-z0-9-\s]{2,}$/
    if (pattern.test(value)) {
      this.formData.login = value
      this.callback(this.formData)
    } else {
      return 'At least 3 characters, start with a letter, only English letters'
    }
  }
  private passwordValidation(value: string): string | undefined {
    this.formData.password = ''
    const pattern = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{6,}$/
    if (pattern.test(value)) {
      this.formData.password = value
      this.callback(this.formData)
    } else {
      return 'At least 6 characters and at least 1 special character'
    }
  }
}
