import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import './header.scss'
import Navigation from './navigation/navigation.ts'
import { state } from '../../state/state.ts'
import { eventType } from '../../typing/types.ts'
import { decimals } from '../../utils/calcDelta.ts'

export type HeaderProps = {
  additionalLinkClasses: Array<string>
  additionalMenuClasses: Array<string>
  additionalCartClasses?: Array<string>
}

export default class Header extends HtmlElementComponent<'header'> {
  private isLoggedIn = state.isLoggedIn()
  private readonly itemsInCart: HtmlElementComponent<'p'>
  private readonly totalPriceInCart: HtmlElementComponent<'p'>
  private readonly totalDiscountPriceInCart: HtmlElementComponent<'p'>
  private readonly cartLink: HtmlElementComponent<'a'>

  private readonly rightContainer: HtmlElementComponent<'div'>
  private readonly burgerButton: HtmlElementComponent<'button'>
  private readonly navigation: Navigation
  constructor(props: HeaderProps) {
    super({
      tag: 'header',
      classes: ['header'],
    })
    this.itemsInCart = this.createItemsInCart()
    this.totalPriceInCart = this.createTotalPrice()
    this.totalDiscountPriceInCart = this.createTotalDiscountPrice()
    this.cartLink = this.createCartLink(props.additionalCartClasses ?? [])
    this.rightContainer = this.createRightContainer(props.additionalMenuClasses)
    this.rightContainer.prependChildren(this.cartLink)
    this.burgerButton = this.createBurgerMenuButton()
    this.navigation = new Navigation(() => this.closeBurgerMenu())

    this.mountChildren(
      new Container(
        ['header__container'],
        [this.createLogo(props.additionalLinkClasses), this.navigation, this.burgerButton, this.rightContainer]
      )
    )
    this.changeCartIconDisplay()
    this.rerenderData()
    window.matchMedia('(max-width: 768px)').addEventListener('change', (event) => {
      if (!event.matches) {
        this.closeBurgerMenu()
      }
    })
    this.on(eventType.addItemToCart, () => this.rerenderData())
    this.on(eventType.removeItemToCart, () => this.rerenderData())
  }

  private openBurgerMenu(): void {
    if (this.burgerButton.hasAttribute('data-open')) {
      this.closeBurgerMenu()
    } else {
      document.body.classList.add('no-scroll')
      this.rightContainer.addAttribute('data-open', '')
      this.burgerButton.addAttribute('data-open', '')
      this.navigation.addAttribute('data-open', '')
    }
  }
  private closeBurgerMenu(): void {
    document.body.classList.remove('no-scroll')
    this.rightContainer.removeAttribute('data-open')
    this.burgerButton.removeAttribute('data-open')
    this.navigation.removeAttribute('data-open')
  }

  private changeCartIconDisplay(): void {
    if (!this.isLoggedIn && state.getNumberOfItems() === 0) {
      this.cartLink.changeDisplay('none')
    } else if (!this.isLoggedIn && state.getNumberOfItems() !== 0) {
      this.cartLink.changeDisplay('flex')
    } else if (this.isLoggedIn) {
      this.cartLink.changeDisplay('flex')
    }
  }

  private ceilToDecimals(number_: number): number {
    return Math.ceil(number_ * decimals) / decimals
  }

  private rerenderData(): void {
    this.itemsInCart.changeTextContent(state.getNumberOfItems().toString())
    this.totalPriceInCart.changeTextContent(
      !this.isLoggedIn
        ? ''
        : this.ceilToDecimals(state.getPrice().price) === this.ceilToDecimals(state.getPrice().discountPrice)
          ? ''
          : this.ceilToDecimals(state.getPrice().price).toString()
    )
    this.totalDiscountPriceInCart.changeTextContent(
      !this.isLoggedIn
        ? ''
        : this.ceilToDecimals(state.getPrice().price * decimals) ===
              this.ceilToDecimals(state.getPrice().discountPrice * decimals) &&
            this.ceilToDecimals(state.getPrice().price) === 0
          ? ''
          : this.ceilToDecimals(state.getPrice().discountPrice).toString()
    )
    this.changeCartIconDisplay()
  }

  private createLogo(additionalLinkClasses: Array<string>): HtmlElementComponent<'a'> {
    return new HtmlElementComponent<'a'>({
      tag: 'a',
      attributes: [
        {
          name: 'href',
          value: 'main',
        },
      ],
      listeners: [
        {
          type: 'click',
          value: () => this.closeBurgerMenu(),
        },
      ],
      classes: ['header__logo', ...additionalLinkClasses],
      children: [
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '93',
            },
            {
              name: 'height',
              value: '23',
            },
            {
              name: 'viewBox',
              value: '0 0 93 23',
            },
          ],
          classes: ['header__logo_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#logo`,
                },
              ],
            }),
          ],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['header__logo_circle'],
        }),
        new HtmlElementComponent<'h2'>({
          tag: 'h2',
          text: 'COFFEE HOUSE',
          classes: ['header__logo_text'],
        }),
      ],
    })
  }
  private createBurgerMenuButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      classes: ['header__burger-menu'],
      listeners: [
        {
          type: 'click',
          value: () => this.openBurgerMenu(),
        },
      ],
      children: [
        new HtmlElementComponent<'span'>({
          tag: 'span',
          classes: ['header__burger-menu_line', 'up'],
        }),
        new HtmlElementComponent<'span'>({
          tag: 'span',
          classes: ['header__burger-menu_line', 'down'],
        }),
      ],
    })
  }
  private createRightContainer(additionalMenuClasses: Array<string>): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['header__left-container'],
      children: [
        new HtmlElementComponent<'a'>({
          tag: 'a',
          attributes: [
            {
              name: 'href',
              value: 'menu',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: () => this.closeBurgerMenu(),
            },
          ],
          classes: ['header__menu', ...additionalMenuClasses],
          children: [
            new HtmlElementComponent<'h2'>({
              tag: 'h2',
              text: 'Menu',
              classes: ['header__menu_text'],
            }),
            new SvgElementComponent<'svg'>({
              tag: 'svg',
              attributes: [
                {
                  name: 'width',
                  value: '20',
                },
                {
                  name: 'height',
                  value: '20',
                },
                {
                  name: 'viewBox',
                  value: '0 0 20 20',
                },
              ],
              classes: ['header__menu_svg'],
              children: [
                new SvgElementComponent<'use'>({
                  tag: 'use',
                  attributes: [
                    {
                      name: 'href',
                      value: `./icon.svg#cup`,
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  }
  private createCartLink(additionalCartClasses: Array<string>): HtmlElementComponent<'a'> {
    return new HtmlElementComponent<'a'>({
      tag: 'a',
      attributes: [
        {
          name: 'href',
          value: 'cart',
        },
      ],
      listeners: [
        {
          type: 'click',
          value: () => this.closeBurgerMenu(),
        },
      ],
      classes: ['header__menu', ...(additionalCartClasses ?? [])],
      children: [
        new HtmlElementComponent<'h2'>({
          tag: 'h2',
          text: 'Cart',
          classes: ['header__menu_text', 'header__menu_text_cart'],
        }),
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '20',
            },
            {
              name: 'height',
              value: '20',
            },
            {
              name: 'viewBox',
              value: '0 0 20 20',
            },
          ],
          classes: ['header__menu_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#cart`,
                },
              ],
            }),
          ],
        }),
        this.itemsInCart,
        this.totalPriceInCart,
        this.totalDiscountPriceInCart,
      ],
    })
  }
  private createItemsInCart(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      text: state.getNumberOfItems().toString(),
      classes: ['header__cart-number'],
    })
  }
  private createTotalPrice(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      classes: ['header__icon-price'],
    })
  }
  private createTotalDiscountPrice(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      classes: ['header__icon-discount-price'],
    })
  }
}
