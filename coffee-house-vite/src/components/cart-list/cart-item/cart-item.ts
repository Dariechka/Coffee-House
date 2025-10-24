import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import { eventType, type StateItemToCart } from '../../../typing/types.ts'
import { state } from '../../../state/state.ts'
import { SvgElementComponent } from '../../../share/svg-element-component.ts'
import { fixed } from '../../../utils/calcDelta.ts'

export default class CartItem extends HtmlElementComponent<'div'> {
  private isLoggedIn = state.isLoggedIn()
  constructor(private item: StateItemToCart) {
    super({
      tag: 'div',
      classes: ['cart__list__item'],
    })
    this.mountChildren(this.createInfoBlock(), this.createPriceBlock())
  }

  public clear(): void {
    this.unmount()
  }

  private createInfoBlock(): HtmlElementComponent<'div'> {
    const img = new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['cart__img'],
    })
    img.setImage(`./images/card-${this.item.productId}.png`)
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['cart__list__item_block'],
      children: [
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '24',
            },
            {
              name: 'height',
              value: '24',
            },
            {
              name: 'viewBox',
              value: '0 0 24 24',
            },
          ],
          classes: ['cart__list__item_svg'],
          listeners: [
            {
              type: 'click',
              value: (): void => {
                state.removeItemFromCart(this.item)
                this.clear()
                this.emit(eventType.removeItemToCart)
              },
            },
          ],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#bin`,
                },
              ],
            }),
          ],
        }),
        img,
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['cart__list__item_text'],
          children: [
            new HtmlElementComponent<'h3'>({
              tag: 'h3',
              text: this.item.productName,
              classes: ['cart__list__item_text_title'],
            }),
            new HtmlElementComponent<'h3'>({
              tag: 'h3',
              text: this.item.size + ', ' + this.item.additives.join(', '),
              classes: ['cart__list__item_text_text'],
            }),
          ],
        }),
      ],
    })
  }

  private createPriceBlock(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['cart__list__item_block'],
      children: [
        new HtmlElementComponent<'p'>({
          tag: 'p',
          text: !this.isLoggedIn
            ? ''
            : this.item.price === this.item.unloggedPrice
              ? ''
              : '$' + this.item.unloggedPrice.toFixed(fixed),
          classes: ['menu__card__text_large_price'],
        }),
        new HtmlElementComponent<'p'>({
          tag: 'p',
          text: !this.isLoggedIn ? '$' + this.item.unloggedPrice.toFixed(fixed) : '$' + this.item.price.toFixed(fixed),
          classes: ['menu__card__text_large'],
        }),
      ],
    })
  }
}
