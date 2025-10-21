import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import './header.scss'
import Navigation from './navigation/navigation.ts'

export type HeaderProps = {
  additionalLinkClasses: Array<string>
  additionalMenuClasses: Array<string>
}

export default class Header extends HtmlElementComponent<'header'> {
  private readonly itemsInCart: HtmlElementComponent<'p'>
  private readonly leftContainer: HtmlElementComponent<'div'>
  private readonly burgerButton: HtmlElementComponent<'button'>
  private readonly navigation: Navigation
  constructor(props: HeaderProps) {
    super({
      tag: 'header',
      classes: ['header'],
    })
    this.itemsInCart = this.createItemsInCart()
    this.leftContainer = this.createLeftContainer(props.additionalMenuClasses)
    this.burgerButton = this.createBurgerMenuButton()
    this.navigation = new Navigation(() => this.closeBurgerMenu())

    this.mountChildren(
      new Container(
        ['header__container'],
        [this.createLogo(props.additionalLinkClasses), this.navigation, this.burgerButton, this.leftContainer]
      )
    )
    this.burgerButton.handleEvent('click', () => this.openBurgerMenu())
    window.matchMedia('(max-width: 768px)').addEventListener('change', (event) => {
      if (!event.matches) {
        this.closeBurgerMenu()
      }
    })
  }

  private openBurgerMenu(): void {
    if (this.burgerButton.hasAttribute('data-open')) {
      this.closeBurgerMenu()
    } else {
      document.body.classList.add('no-scroll')
      this.leftContainer.addAttribute('data-open', '')
      this.burgerButton.addAttribute('data-open', '')
      this.navigation.addAttribute('data-open', '')
    }
  }

  private closeBurgerMenu(): void {
    document.body.classList.remove('no-scroll')
    this.leftContainer.removeAttribute('data-open')
    this.burgerButton.removeAttribute('data-open')
    this.navigation.removeAttribute('data-open')
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

  private createLeftContainer(additionalMenuClasses: Array<string>): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['header__left-container'],
      children: [
        new HtmlElementComponent<'a'>({
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
          classes: ['header__menu'],
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
          ],
        }),
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

  private createItemsInCart(): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      text: '0',
      classes: ['header__menu_text', 'header__cart-number'],
    })
  }
}
