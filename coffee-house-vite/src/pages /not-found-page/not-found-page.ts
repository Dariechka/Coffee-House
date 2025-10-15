import { HtmlElementComponent } from '../../share/html-element-component.ts'

export default class NotFoundPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
  }
}
