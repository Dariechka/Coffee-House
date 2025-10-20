import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'

export default class CartPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          page: 'cart',
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
      ],
      classes: ['page'],
    })
  }
}
