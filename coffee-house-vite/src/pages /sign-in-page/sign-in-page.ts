import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'

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
      classes: ['page'],
    })
  }
}
