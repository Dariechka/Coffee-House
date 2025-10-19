import { HtmlElementComponent } from '../../share/html-element-component.ts'
import { eventType, type ExtendedProduct } from '../../typing/types.ts'
import './modal.scss'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'
import ModalSizeButton from './modal-size-button/modal-size-button.ts'
import ModalAdditiveButton from './modal-additive-button/modal-additive-button.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import { topOffset } from '../../utils/calcDelta.ts'

export default class Modal extends HtmlElementComponent<'div'> {
  private isSignIn: boolean = true
  private isErrorRendered: boolean = false
  private totalPrice: number = 0
  private totalDiscountPrice: number = 0

  private sizeButtonsContainer: Array<ModalSizeButton> = []
  private additiveButtonsContainer: Array<ModalAdditiveButton> = []

  private readonly closeButton: HtmlElementComponent<'button'>
  private readonly addButton: HtmlElementComponent<'button'>

  constructor() {
    super({
      tag: 'div',
      classes: ['modal-wrapper'],
    })
    this.closeButton = this.createCloseButton()
    this.addButton = this.createAddButton()

    setTimeout((): void => {
      const closeListener = (event: MouseEvent): void => {
        this.closeModalListener(event)
        document.body.removeEventListener('click', closeListener)
      }
      document.body.addEventListener('click', closeListener)
    })

    document.addEventListener('keyup', (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        this.closeModal()
      }
    })
  }

  public closeModalListener(event: MouseEvent): void {
    if (this.containsEvent(event) && !this.closeButton.containsEvent(event) && !this.addButton.containsEvent(event)) {
      return
    }
    this.closeModal()
  }

  public clearModal(): void {
    this.children.splice(0, this.children.length).forEach((child): void => child.unmount())
  }

  public renderLoader(): void {
    this.isSignIn = false
    this.mountChildren(new Loader())
  }

  public renderError(): void {
    this.emit(eventType.closeBackground)
    this.isErrorRendered = true
    this.changeTopValue(topOffset)
    this.mountChildren(new ErrorMessage('Something went wrong. Please, try again'))
  }

  public renderProduct(product: ExtendedProduct): void {
    this.isSignIn = false
    this.totalPrice = +product.sizes.s.price
    this.totalDiscountPrice = product.sizes.s.discountPrice ? +product.sizes.s.discountPrice : 0
    this.sizeButtonsContainer = [
      ...Object.entries(product.sizes).map((entry) => new ModalSizeButton({ size: entry[1], typeSize: entry[0] })),
    ]
    this.additiveButtonsContainer = [
      ...product.additives.map((additive, index) => new ModalAdditiveButton({ additive, index })),
    ]

    this.mountChildren(this.createProductModal(product))
  }

  private closeModal(): void {
    if (!this.isErrorRendered) {
      this.emit(eventType.closeBackground)
    }
    this.unmount()
  }

  private addToCart(): void {
    this.emit(
      eventType.addToCart,
      JSON.stringify({ totalPrise: this.totalPrice, totalDiscount: this.totalDiscountPrice })
    )
    this.closeModal()
  }

  private createProductModal(product: ExtendedProduct): HtmlElementComponent<'div'> {
    const img = new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['modal__img'],
    })
    img.setImage(`./images/card-${product.id}.png`)

    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['modal'],
      children: [
        this.closeButton,
        img,
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['modal__info'],
          children: [
            new HtmlElementComponent<'div'>({
              tag: 'div',
              classes: ['modal__info__title'],
              children: [
                new HtmlElementComponent<'h2'>({
                  tag: 'h2',
                  text: product.name,
                  classes: ['menu__card__text_large'],
                }),
                new HtmlElementComponent<'p'>({
                  tag: 'p',
                  text: product.description,
                  classes: ['menu__card__text_small', 'letter-spacing'],
                }),
              ],
            }),
            new HtmlElementComponent<'div'>({
              tag: 'div',
              classes: ['modal__info__buttons-container'],
              children: [
                new HtmlElementComponent<'p'>({
                  tag: 'p',
                  text: 'Size',
                  classes: ['menu__card__text_small'],
                }),
                new HtmlElementComponent<'div'>({
                  tag: 'div',
                  classes: ['menu__buttons-container', 'modal__buttons'],
                  children: [...this.sizeButtonsContainer],
                }),
              ],
            }),
            new HtmlElementComponent<'div'>({
              tag: 'div',
              classes: ['modal__info__buttons-container'],
              children: [
                new HtmlElementComponent<'p'>({
                  tag: 'p',
                  text: 'Additives',
                  classes: ['menu__card__text_small'],
                }),
                new HtmlElementComponent<'div'>({
                  tag: 'div',
                  classes: ['menu__buttons-container', 'modal__buttons'],
                  children: [...this.additiveButtonsContainer],
                }),
              ],
            }),
            new HtmlElementComponent<'div'>({
              tag: 'div',
              classes: ['modal__info__price-container'],
              children: [
                new HtmlElementComponent<'h3'>({
                  tag: 'h3',
                  text: 'Total:',
                  classes: ['menu__card__text_large'],
                }),
                new HtmlElementComponent<'div'>({
                  tag: 'div',
                  classes: ['modal__info__price-container_price'],
                  children: [
                    new HtmlElementComponent<'p'>({
                      tag: 'p',
                      text: !this.isSignIn ? '' : this.totalDiscountPrice > 0 ? `$${this.totalPrice}` : '',
                      classes: ['menu__card__text_large_price'],
                    }),
                    new HtmlElementComponent<'p'>({
                      tag: 'p',
                      text: !this.isSignIn
                        ? `$${this.totalPrice}`
                        : this.totalDiscountPrice > 0
                          ? `$${this.totalDiscountPrice}`
                          : `$${this.totalPrice}`,
                      classes: ['menu__card__text_large'],
                    }),
                  ],
                }),
              ],
            }),
            this.addButton,
          ],
        }),
      ],
    })
  }
  private createCloseButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      classes: ['modal__close'],
      listeners: [
        {
          type: 'click',
          value: () => this.closeModal(),
        },
      ],
      children: [
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '14',
            },
            {
              name: 'height',
              value: '14',
            },
            {
              name: 'viewBox',
              value: '0 0 14 14',
            },
          ],
          classes: ['modal__close_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#cross`,
                },
              ],
            }),
          ],
        }),
      ],
    })
  }
  private createAddButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      text: 'Add to cart',
      classes: ['modal__info__add'],
      listeners: [
        {
          type: 'click',
          value: () => this.addToCart(),
        },
      ],
    })
  }
}
