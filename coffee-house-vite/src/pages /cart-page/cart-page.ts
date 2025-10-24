import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import './cart-page.scss'
import ContactSection from '../../components/contact-section/contact-section.ts'
import Container from '../../components/container/container.ts'
import { router } from '../../app.ts'
import { Page } from '../../router/pages.ts'
import { state } from '../../state/state.ts'
import CartList from '../../components/cart-list/cart-list.ts'
import { eventType } from '../../typing/types.ts'
import { decimals } from '../../utils/calcDelta.ts'

export default class CartPage extends HtmlElementComponent<'section'> {
  private isLoggedIn = state.isLoggedIn()
  private readonly confirmButton: HtmlElementComponent<'button'>
  private readonly signButtonsContainer: HtmlElementComponent<'div'>
  private readonly totalBlock: HtmlElementComponent<'div'>
  private readonly totalPriceInCart: HtmlElementComponent<'p'>
  private readonly totalDiscountPriceInCart: HtmlElementComponent<'p'>
  private readonly cartList: CartList = new CartList()
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
      ],
      classes: ['cart-page'],
    })
    this.totalPriceInCart = this.createTotalPrice()
    this.totalDiscountPriceInCart = this.createTotalDiscountPrice()
    this.confirmButton = this.createConfirmButton()
    this.signButtonsContainer = this.createSignButtonsContainer()
    this.totalBlock = this.createTotalBlock()
    this.mountChildren(
      new Container(
        ['cart__container'],
        [
          new HtmlElementComponent<'h2'>({
            tag: 'h2',
            text: 'Cart',
            classes: ['cart__title'],
          }),
          this.cartList,
          this.totalBlock,
          this.signButtonsContainer,
          this.confirmButton,
        ]
      ),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )

    if (!this.isLoggedIn) {
      this.signButtonsContainer.changeDisplay('flex')
      this.confirmButton.changeDisplay('none')
    } else if (this.isLoggedIn && state.getNumberOfItems() === 0) {
      this.signButtonsContainer.changeDisplay('none')
      this.confirmButton.changeDisplay('none')
    } else {
      this.signButtonsContainer.changeDisplay('none')
      this.confirmButton.changeDisplay('flex')
    }
    this.rerenderPrice()

    this.on(eventType.removeItemToCart, () => this.rerenderPrice())
  }

  private ceilToDecimals(number_: number): number {
    return Math.ceil(number_ * decimals) / decimals
  }

  private rerenderPrice(): void {
    this.totalPriceInCart.changeTextContent(
      !this.isLoggedIn
        ? ''
        : this.ceilToDecimals(state.getPrice().price) === this.ceilToDecimals(state.getPrice().discountPrice)
          ? ''
          : '$' + this.ceilToDecimals(state.getPrice().price)
    )
    this.totalDiscountPriceInCart.changeTextContent(
      !this.isLoggedIn
        ? '$' + this.ceilToDecimals(state.getPrice().price)
        : '$' + this.ceilToDecimals(state.getPrice().discountPrice)
    )
  }

  private createSignButtonsContainer(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['cart__button-container'],
      children: [
        new HtmlElementComponent<'button'>({
          tag: 'button',
          text: 'Sign in',
          attributes: [
            {
              name: 'type',
              value: 'button',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: () => router.navigate(Page.SIGN_IN),
            },
          ],
          classes: ['cart__button'],
        }),
        new HtmlElementComponent<'button'>({
          tag: 'button',
          text: 'Registration',
          attributes: [
            {
              name: 'type',
              value: 'button',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: () => router.navigate(Page.Registration),
            },
          ],
          classes: ['cart__button'],
        }),
      ],
    })
  }
  private createConfirmButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      text: 'Confirm',
      attributes: [
        {
          name: 'type',
          value: 'submit',
        },
      ],
      classes: ['cart__button'],
    })
  }
  private createTotalBlock(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['cart__total-block'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['cart__total-block__item'],
          children: [
            new HtmlElementComponent<'p'>({
              tag: 'p',
              text: 'Total:',
              classes: ['cart__total-block__item__text'],
            }),
            new HtmlElementComponent<'div'>({
              tag: 'div',
              classes: ['modal__info__price-container_price'],
              children: [this.totalPriceInCart, this.totalDiscountPriceInCart],
            }),
          ],
        }),
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
