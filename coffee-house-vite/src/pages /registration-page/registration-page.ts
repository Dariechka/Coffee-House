import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'

export default class RegistrationPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          page: 'registration',
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
      ],
      classes: ['page'],
    })
  }
}
