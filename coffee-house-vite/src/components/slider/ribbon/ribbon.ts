import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { ElementComponent } from '../../../share/element-component.ts'

export default class Ribbon extends HtmlElementComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
      classes: ['favorite__slider__ribbon'],
    })
  }

  public clearRibbon(): void {
    this.children.forEach((child: ElementComponent<Element>): void => child.unmount())
  }
}
