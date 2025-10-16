import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'

export default class MainPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
    this.mountChildren(
      new Header('menu', ['header__logo_active']),
      new HtmlElementComponent<'p'>({
        tag: 'p',
        text: 'Main page',
      }),
    )
  }
}
