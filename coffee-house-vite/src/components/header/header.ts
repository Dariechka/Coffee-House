import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import './header.scss'

export type HeaderProps = {
  additionalLinkClasses: Array<string>
  additionalMenuClasses: Array<string>
}

export default class Header extends HtmlElementComponent<'header'> {
  constructor(props: HeaderProps) {
    super({
      tag: 'header',
      classes: ['header'],
    })
    this.mountChildren(
      new Container(
        ['header__container'],
        [
          this.createLogo(props.additionalLinkClasses),
          this.createBurgerMenuButton(),
          this.createMenuButton(props.additionalMenuClasses),
        ]
      )
    )
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

  private createMenuButton(additionalMenuClasses: Array<string>): HtmlElementComponent<'a'> {
    return new HtmlElementComponent<'a'>({
      tag: 'a',
      attributes: [
        {
          name: 'href',
          value: 'menu',
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
    })
  }
}
