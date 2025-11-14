import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import ContactSection from '../../components/contact-section/contact-section.ts'
import './sign-in-page.scss'
import SignInForm from './sign-in-form/sign-in-form.ts'
import Container from '../../components/container/container.ts'

export default class SignInPage extends HtmlElementComponent<'section'> {
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
          new SignInForm(),
        ]
      ),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )
  }
}
