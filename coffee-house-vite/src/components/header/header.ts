import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'

export default class Header extends HtmlElementComponent<'header'> {
  constructor(href: string, additionalLinkClasses: Array<string> = []) {
    super({
      tag: 'header',
      children: [new Container('header__container')],
      classes: ['header'],
    })
    this.mountChildren(this.createLogo(href, additionalLinkClasses))
  }

  private createLogo(href: string, additionalLinkClasses: Array<string>) {
    return new HtmlElementComponent<'a'>({
      tag: 'a',
      attributes: [
        {
          name: 'href',
          value: href,
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
            }
            ],
          classes: ['header__logo_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icons.svg#logo`,
                },
              ],
            })
          ]
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['header__logo_circle'],
        }),
        new HtmlElementComponent<'h2'>({
          tag: 'h2',
          text: 'COFFEE HOUSE',
          classes: ['header__logo_text'],
        })
      ]
    })
  }
}
