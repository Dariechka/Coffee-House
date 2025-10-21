import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import './cart-page.scss'

export default class CartPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
      ],
      classes: ['cart-page'],
    })
  }
}
