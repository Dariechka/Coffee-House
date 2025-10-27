import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import './cart-page.scss'
import ContactSection from '../../components/contact-section/contact-section.ts'
import Container from '../../components/container/container.ts'
import { router } from '../../app.ts'
import { Page } from '../../router/pages.ts'
import { state } from '../../state/state.ts'
import CartList from '../../components/cart-list/cart-list.ts'
import { eventType, type ItemToCart, type Order } from '../../typing/types.ts'
import { decimals, fixed, timerDelayValue } from '../../utils/calcDelta.ts'
import { confirmOrder, getUserData } from '../../share/api.ts'
import ErrorMessage from '../../components/error-message/error-message.ts'
import Loader from '../../components/loader/loader.ts'

export default class CartPage extends HtmlElementComponent<'section'> {
  private isLoggedIn = state.isLoggedIn()
  private readonly confirmButton: HtmlElementComponent<'button'>
  private readonly signButtonsContainer: HtmlElementComponent<'div'>
  private readonly totalBlock: HtmlElementComponent<'div'>
  private readonly totalPriceInCart: HtmlElementComponent<'p'>
  private readonly totalDiscountPriceInCart: HtmlElementComponent<'p'>
  private readonly cartList: CartList = new CartList()
  private readonly errorMessage: ErrorMessage = new ErrorMessage('Something went wrong. Please, try again')

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
    this.on(eventType.removeItemToCart, () => {
      this.rerenderPrice()
      if (state.getNumberOfItems() === 0) {
        this.confirmButton.changeDisplay('none')
      }
    })

    this.createTotalUserData()
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
          : '$' + this.ceilToDecimals(state.getPrice().price).toFixed(fixed)
    )
    this.totalDiscountPriceInCart.changeTextContent(
      !this.isLoggedIn
        ? '$' + this.ceilToDecimals(state.getPrice().price).toFixed(fixed)
        : '$' + this.ceilToDecimals(state.getPrice().discountPrice).toFixed(fixed)
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
          value: 'button',
        },
      ],
      listeners: [
        {
          type: 'click',
          value: async (): Promise<void> => this.confirmOrder(),
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
              classes: ['cart__list__item_block'],
              children: [this.totalPriceInCart, this.totalDiscountPriceInCart],
            }),
          ],
        }),
      ],
    })
  }

  private async createTotalUserData(): Promise<void> {
    const userToken = state.getUserToken()
    if (!this.isLoggedIn || !userToken) {
      return
    }
    this.totalBlock.mountChildren(new Loader())
    setTimeout(async () => {
      const user = await getUserData(userToken)
      if (!user || typeof user === 'string') {
        this.totalBlock.unmountLastChild()
        this.totalBlock.mountChildren(new ErrorMessage('Something went wrong. Please, refresh the page'))
      } else {
        const userHTML = [
          new HtmlElementComponent<'div'>({
            tag: 'div',
            classes: ['cart__total-block__item'],
            children: [
              new HtmlElementComponent<'p'>({
                tag: 'p',
                text: 'Address:',
                classes: ['cart__total-block__item__text'],
              }),
              new HtmlElementComponent<'div'>({
                tag: 'div',
                classes: ['cart__list__item_block'],
                children: [
                  new HtmlElementComponent<'p'>({
                    tag: 'p',
                    text: user.data.city + ',',
                    classes: ['cart__total-block__item__text'],
                  }),
                  new HtmlElementComponent<'p'>({
                    tag: 'p',
                    text: user.data.street + ',',
                    classes: ['cart__total-block__item__text'],
                  }),
                  new HtmlElementComponent<'p'>({
                    tag: 'p',
                    text: user.data.houseNumber,
                    classes: ['cart__total-block__item__text'],
                  }),
                ],
              }),
            ],
          }),
          new HtmlElementComponent<'div'>({
            tag: 'div',
            classes: ['cart__total-block__item'],
            children: [
              new HtmlElementComponent<'p'>({
                tag: 'p',
                text: 'Pay by:',
                classes: ['cart__total-block__item__text'],
              }),
              new HtmlElementComponent<'div'>({
                tag: 'div',
                classes: ['cart__list__item_block'],
                children: [
                  new HtmlElementComponent<'p'>({
                    tag: 'p',
                    text: user.data.paymentMethod
                      .split('')
                      .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
                      .join(''),
                    classes: ['cart__total-block__item__text'],
                  }),
                ],
              }),
            ],
          }),
        ]
        this.totalBlock.unmountLastChild()
        this.totalBlock.mountChildren(...userHTML)
      }
    }, timerDelayValue)
  }
  private async confirmOrder(): Promise<void> {
    this.totalBlock.mountChildren(new Loader())
    setTimeout(async () => {
      const itemsToCart: Array<ItemToCart> = state.getOrders().map((item) => {
        return {
          productId: item.productId,
          size: item.size,
          additives: item.additives,
          quantity: item.quantity,
        }
      })
      const totalPrice = this.isLoggedIn ? state.getPrice().discountPrice : state.getPrice().price
      const order: Order = {
        items: itemsToCart,
        totalPrice: totalPrice,
      }
      const response = await confirmOrder(order)
      this.totalBlock.unmountLastChild()
      if (typeof response === 'string') {
        this.prependChildren(this.errorMessage)
      } else {
        this.errorMessage.unmount()
        this.cartList.clearList()
        this.cartList.renderSuccess('Thank you for your order! Our manager will contact you shortly.')
        state.clearOrders()
        this.emit(eventType.removeItemToCart)
      }
    }, timerDelayValue)
  }
  private createTotalPrice(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      classes: ['cart__list__item_block_price'],
    })
  }
  private createTotalDiscountPrice(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      classes: ['cart__list__item_block_large'],
    })
  }
}
