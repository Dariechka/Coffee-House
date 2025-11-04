import { HtmlElementComponent } from '../../share/html-element-component.ts'
import './container.scss'
import type { ElementComponent } from '../../share/element-component.ts'

export default class Container extends HtmlElementComponent<'div'> {
  constructor(additionalClass: Array<string> = [], children: Array<ElementComponent<Element>>) {
    super({
      tag: 'div',
      classes: ['container', ...additionalClass],
    })
    this.mountChildren(...children)
  }
}
