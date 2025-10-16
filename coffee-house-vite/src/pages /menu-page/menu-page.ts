import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'

export default class MenuPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
    this.mountChildren(
      new Header('main'),
      new HtmlElementComponent<'p'>({
        tag: 'p',
        text: 'Menu page',
      }),
    )
  }
}
