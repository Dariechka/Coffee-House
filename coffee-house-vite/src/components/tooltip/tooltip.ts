import { HtmlElementComponent } from '../../share/html-element-component.ts'
import type { PriceData } from '../../typing/types.ts'
import './tooltip.scss'

export default class Tooltip extends HtmlElementComponent<'div'> {
  constructor(data: PriceData, isSignIn: boolean = true) {
    super({
      tag: 'div',
      classes: ['tooltip'],
    })

    this.mountChildren(
      new HtmlElementComponent<'p'>({
        tag: 'p',
        text: !isSignIn ? '' : data.discountPrice > 0 ? `$${data.price}` : '',
        classes: ['menu__card__text_large_price'],
      }),
      new HtmlElementComponent<'p'>({
        tag: 'p',
        text: !isSignIn ? `$${data.price}` : data.discountPrice > 0 ? `$${data.discountPrice}` : `$${data.price}`,
        classes: ['menu__card__text_large'],
      })
    )
  }

  public appear(): void {
    this.element.style.display = 'flex'
  }

  public disappear(): void {
    this.element.style.display = 'none'
  }
}
