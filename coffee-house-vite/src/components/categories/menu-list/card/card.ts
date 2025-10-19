import { HtmlElementComponent } from '../../../../share/html-element-component.ts'
import { eventType, type Product } from '../../../../typing/types.ts'

export default class Card extends HtmlElementComponent<'div'> {
  private isSignIn: boolean = true

  constructor(private product: Product) {
    super({
      tag: 'div',
      classes: ['menu__card'],
      listeners: [
        {
          type: 'click',
          value: (): void => {
            this.emit(eventType.fetchProductData, this.product.id.toString())
          },
        },
      ],
    })

    this.mountChildren(this.createImage(), this.createText())
  }

  private createImage(): HtmlElementComponent<'img'> {
    const img = new HtmlElementComponent<'img'>({
      tag: 'img',
      classes: ['menu__card__img'],
    })
    img.setImage(`./images/card-${this.product.id}.png`)
    return img
  }

  private createText(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['menu__card__text'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['menu__card__text_text'],
          children: [
            new HtmlElementComponent<'h4'>({
              tag: 'h4',
              text: this.product.name,
              classes: ['menu__card__text_large'],
            }),
            new HtmlElementComponent<'p'>({
              tag: 'p',
              text: this.product.description,
              classes: ['menu__card__text_small'],
            }),
          ],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['menu__card__text_price'],
          children: [
            new HtmlElementComponent<'p'>({
              tag: 'p',
              text: !this.isSignIn
                ? `$${this.product.price}`
                : this.product.discountPrice
                  ? `$${this.product.discountPrice}`
                  : `$${this.product.price}`,
              classes: ['menu__card__text_large'],
            }),
            new HtmlElementComponent<'p'>({
              tag: 'p',
              text: !this.isSignIn ? '' : this.product.discountPrice ? `$${this.product.price}` : '',
              classes: ['menu__card__text_large_price'],
            }),
          ],
        }),
      ],
    })
  }
}
