import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import ContactSection from '../../components/contact-section/contact-section.ts'
import './sign-in-page.scss'
import SignInForm from './sign-in-form/sign-in-form.ts'
import Container from '../../components/container/container.ts'
import type { SignInRequest } from '../../typing/types.ts'

export default class SignInPage extends HtmlElementComponent<'section'> {
  private submitButton: HtmlElementComponent<'button'> = this.createSubmitButton()

  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
      ],
      classes: ['sign-in-page'],
    })
    this.mountChildren(
      new Container(
        ['sign-in__container'],
        [
          new HtmlElementComponent<'h2'>({
            tag: 'h2',
            text: 'Sign in',
            classes: ['sign-in__title'],
          }),
          new SignInForm((data: SignInRequest) => this.checkFormForValid(data)),
          this.submitButton,
        ]
      ),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )
  }

  private checkFormForValid(formData: SignInRequest): void {
    if (Object.keys(formData).filter((key) => key === '').length === 0) {
      this.submitButton.removeAttribute('disabled')
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
      classes: ['registration__submit'],
    })
  }
}
