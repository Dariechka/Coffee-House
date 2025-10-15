import { HtmlElementComponent } from '../../share/html-element-component.ts'

export default class Container extends HtmlElementComponent<'div'> {
  constructor(additionalClass?: string) {
    super({
      tag: 'div',
      classes: ['container', additionalClass ?? ''],
    })
  }
}
