import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import ContactSection from '../../components/contact-section/contact-section.ts'
import './sign-in-page.scss'

export default class SignInPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
        new HtmlElementComponent<'footer'>({
          tag: 'footer',
          children: [new ContactSection()],
        }),
      ],
      classes: ['sign-in--page'],
    })
  }
}
