import { HtmlElementComponent } from '../../share/html-element-component.ts'
import { state } from '../../state/state.ts'
import CartItem from './cart-item/cart-item.ts'

export default class CartList extends HtmlElementComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
      classes: ['cart__list'],
    })
    this.renderItems()
  }

  public clearList(): void {
    this.children.splice(0, this.children.length).forEach((child): void => child.unmount())
  }

  public renderItems(): void {
    this.clearList()
    for (const item of state.getOrders()) {
      const product = new CartItem(item)
      this.mountChildren(product)
    }
  }
}
