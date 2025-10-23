import { HtmlElementComponent } from '../../share/html-element-component.ts'
import {
  eventType,
  type ExtendedProduct,
  type PriceData,
  type PricesHolder,
  type StateItemToCart,
} from '../../typing/types.ts'
import './modal.scss'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'
import ModalSizeButton from './modal-size-button/modal-size-button.ts'
import ModalAdditiveButton from './modal-additive-button/modal-additive-button.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import { topOffset } from '../../utils/calcDelta.ts'
import { state } from '../../state/state.ts'

export default class Modal extends HtmlElementComponent<'div'> {
  private isSignIn: boolean = true
  private isErrorRendered: boolean = false

  private price: PricesHolder = {
    sizePrice: 0,
    sizeDiscountPrice: 0,
    additivePrice: 0,
    additiveDiscountPrice: 0,
  }
  private dataToOrder: StateItemToCart = {
    productId: 0,
    size: 's',
    additives: [],
    quantity: 1,
    price: 0,
    unloggedPrice: 0,
  }

  private totalPrice: number = 0
  private totalDiscountPrice: number = 0
  private readonly htmlTotalPrice: HtmlElementComponent<'p'>
  private readonly htmlTotalDiscountPrice: HtmlElementComponent<'p'>

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
    this.htmlTotalPrice = this.createTotalPrice()
    this.htmlTotalDiscountPrice = this.createTotalDiscountPrice()

    setTimeout((): void => {
      const closeListener = (event: MouseEvent): void => {
        if (
          this.containsEvent(event) &&
          !this.closeButton.containsEvent(event) &&
          !this.addButton.containsEvent(event)
        ) {
          return
        }
        this.closeModal()
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

  public changeBySize(data: PriceData, size: string): void {
    this.dataToOrder.size = size
    this.price.sizePrice = data.price
    this.price.sizeDiscountPrice = data.discountPrice === 0 ? data.price : data.discountPrice
    this.sizeButtonsContainer.forEach((button) => button.removeActiveClass())
    this.rerenderPrice()
  }
  public changeByAdditive(data: PriceData, twice: boolean, name: string): void {
    if (twice) {
      this.dataToOrder.additives.splice(this.dataToOrder.additives.indexOf(name), 1)
      if (data.discountPrice > 0) {
        this.price.additivePrice -= data.price
        this.price.additiveDiscountPrice -= data.discountPrice
      } else {
        this.price.additivePrice -= data.price
        this.price.additiveDiscountPrice -= data.price
      }
    } else {
      this.dataToOrder.additives.push(name)
      if (data.discountPrice > 0) {
        this.price.additivePrice += data.price
        this.price.additiveDiscountPrice += data.discountPrice
      } else {
        this.price.additivePrice += data.price
        this.price.additiveDiscountPrice += data.price
      }
    }
    this.rerenderPrice()
  }

  public clearModal(): void {
    this.children.splice(0, this.children.length).forEach((child): void => child.unmount())
  }
  public renderLoader(): void {
    this.isErrorRendered = false
    this.mountChildren(new Loader())
  }
  public renderError(): void {
    this.emit(eventType.closeBackground)
    this.isErrorRendered = true
    this.changeTopValue(topOffset)
    this.mountChildren(new ErrorMessage('Something went wrong. Please, try again'))
  }

  public renderProduct(product: ExtendedProduct): void {
    this.isErrorRendered = false
    this.dataToOrder.productId = product.id
    this.dataToOrder.size = product.sizes.s.size
    this.dataToOrder.unloggedPrice = +product.sizes.s.price
    this.dataToOrder.price = product.sizes.s.discountPrice ? +product.sizes.s.discountPrice : +product.sizes.s.price
    this.price.sizePrice = +product.sizes.s.price
    this.price.sizeDiscountPrice = product.sizes.s.discountPrice
      ? +product.sizes.s.discountPrice
      : +product.sizes.s.price
    this.sizeButtonsContainer = [
      ...Object.entries(product.sizes).map((entry) => {
        const button = new ModalSizeButton(
          { size: entry[1], typeSize: entry[0] },
          (data: PriceData, size: string) => this.changeBySize(data, size),
          this.isSignIn
        )
        if (entry[0] === 's') {
          button.addActiveClass()
        }
        return button
      }),
    ]
    this.additiveButtonsContainer = [
      ...product.additives.map(
        (additive, index) =>
          new ModalAdditiveButton(
            { additive, index },
            (data: PriceData, twice: boolean, name: string) => this.changeByAdditive(data, twice, name),
            this.isSignIn
          )
      ),
    ]
    this.rerenderPrice()

    this.mountChildren(this.createProductModal(product))
  }

  private closeModal(): void {
    if (!this.isErrorRendered) {
      this.emit(eventType.closeBackground)
    }
    this.unmount()
  }
  private addToCart(): void {
    this.dataToOrder.price = this.totalDiscountPrice
    this.dataToOrder.unloggedPrice = this.totalPrice
    state.addItemToCart(this.dataToOrder, this.totalPrice, this.totalDiscountPrice)
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
                  children: [this.htmlTotalPrice, this.htmlTotalDiscountPrice],
                }),
              ],
            }),
            this.addButton,
          ],
        }),
      ],
    })
  }

  private rerenderPrice(): void {
    this.totalPrice = this.price.sizePrice + this.price.additivePrice
    this.totalDiscountPrice = this.price.sizeDiscountPrice + this.price.additiveDiscountPrice

    this.htmlTotalPrice.changeTextContent(
      !this.isSignIn ? '' : this.totalDiscountPrice !== this.totalPrice ? `$${this.totalPrice}` : ''
    )
    this.htmlTotalDiscountPrice.changeTextContent(
      !this.isSignIn
        ? `$${this.totalPrice}`
        : this.totalDiscountPrice !== this.totalPrice
          ? `$${this.totalDiscountPrice}`
          : `$${this.totalPrice}`
    )
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
  private createTotalPrice(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      classes: ['menu__card__text_large_price'],
    })
  }
  private createTotalDiscountPrice(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      classes: ['menu__card__text_large'],
    })
  }
}
