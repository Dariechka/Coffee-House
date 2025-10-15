import { HtmlElementComponent } from '../../share/html-element-component.ts'

export default class CartPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
  }
}
