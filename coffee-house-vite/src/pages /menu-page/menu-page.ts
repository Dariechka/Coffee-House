import { HtmlElementComponent } from '../../share/html-element-component.ts'

export default class MenuPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
  }
}
