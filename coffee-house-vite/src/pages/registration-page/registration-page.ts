import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import ContactSection from '../../components/contact-section/contact-section.ts'
import './registration-page.scss'
import RegistrationForm from './registration-form/registration-form.ts'
import Container from '../../components/container/container.ts'

export default class RegistrationPage extends HtmlElementComponent<'section'> {
  private readonly registrationForm: RegistrationForm = new RegistrationForm()
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
      ],
      classes: ['registration-page'],
    })
    this.mountChildren(
      new Container(['registration__container'], [this.createRegistrationSection()]),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )
  }

  private createRegistrationSection(): HtmlElementComponent<'section'> {
    return new HtmlElementComponent<'section'>({
      tag: 'section',
      classes: ['registration'],
      children: [
        new HtmlElementComponent<'h2'>({
          tag: 'h2',
          text: 'Registration',
          classes: ['registration__title'],
        }),
        this.registrationForm,
      ],
    })
  }
}
