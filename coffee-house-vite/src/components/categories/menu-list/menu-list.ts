import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { ElementComponent } from '../../../share/element-component.ts'
import type { Product } from '../../../typing/types.ts'
import Card from './card/card.ts'

export default class MenuList extends HtmlElementComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
      classes: ['menu__list'],
    })
  }

  public clearList(): void {
    this.children.forEach((child: ElementComponent<Element>): void => child.unmount())
  }

  public renderCards(products: Array<Product>): void {
    products.forEach((product) => this.mountChildren(new Card(product)))
  }
}
