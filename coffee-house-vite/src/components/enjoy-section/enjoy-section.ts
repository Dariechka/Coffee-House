import './enjoy-section.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import EnjoyVideoHtmlComponent from '../enjoy-video-component/enjoy-video-component.ts'

export default class EnjoySection extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['enjoy'],
    })
    this.mountChildren(new Container([], [this.createBackground()]))
  }

  private createBackground(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['enjoy__background'],
      children: [
        new EnjoyVideoHtmlComponent(),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['enjoy__text'],
          children: [
            new HtmlElementComponent<'h1'>({
              tag: 'h1',
              classes: ['enjoy__text__title'],
              children: [
                new HtmlElementComponent<'span'>({
                  tag: 'span',
                  text: 'Enjoy ',
                  classes: ['enjoy__text__title_italic'],
                }),
                new HtmlElementComponent<'span'>({
                  tag: 'span',
                  text: 'premium coffee at our charming cafe',
                  classes: ['enjoy__text__title'],
                }),
              ],
            }),
            new HtmlElementComponent<'p'>({
              tag: 'p',
              text: 'With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.',
              classes: ['enjoy__text__text'],
            }),
            new HtmlElementComponent<'a'>({
              tag: 'a',
              attributes: [
                {
                  name: 'href',
                  value: 'menu',
                },
              ],
              classes: ['enjoy__text__link'],
              children: [
                new HtmlElementComponent<'p'>({
                  tag: 'p',
                  text: 'Menu',
                  classes: ['enjoy__text__link_text'],
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
                  classes: ['enjoy__text__link_svg'],
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
        }),
      ],
    })
  }
}
