import './app-section.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'

export default class AppSection extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      attributes: [
        {
          name: 'id',
          value: 'mobile-app',
        },
      ],
      classes: ['app'],
    })
    this.mountChildren(new Container(['app__container'], [this.createTextContainer(), this.createImageContainer()]))
  }

  private createImageContainer(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['app__image'],
      children: [
        new HtmlElementComponent<'img'>({
          tag: 'img',
          classes: ['app__image_img'],
          attributes: [
            {
              name: 'src',
              value: './images/phones.png',
            },
            {
              name: 'alt',
              value: 'phones',
            },
          ],
        }),
      ],
    })
  }
  private createTextContainer(): HtmlElementComponent<'h3'> {
    return new HtmlElementComponent<'h3'>({
      tag: 'h3',
      classes: ['app__text'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['app__text__title'],
          children: [
            new HtmlElementComponent<'span'>({
              tag: 'span',
              text: 'Download ',
              classes: ['app__text__title_italic'],
            }),
            new HtmlElementComponent<'span'>({
              tag: 'span',
              text: 'our apps to start ordering',
              classes: ['app__text__title'],
            }),
          ],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['app__text__text'],
          text: 'Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are',
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['app__text__buttons-container'],
          children: [
            new HtmlElementComponent<'button'>({
              tag: 'button',
              classes: ['app__text__button'],
              children: [
                new SvgElementComponent<'svg'>({
                  tag: 'svg',
                  classes: ['app__text__button__svg'],
                  children: [
                    new SvgElementComponent<'use'>({
                      tag: 'use',
                      attributes: [
                        {
                          name: 'href',
                          value: `./icon.svg#apple`,
                        },
                      ],
                    }),
                  ],
                }),
                new HtmlElementComponent<'span'>({
                  tag: 'span',
                  text: 'Available on the',
                  classes: ['app__text__button__text'],
                  children: [
                    new HtmlElementComponent<'span'>({
                      tag: 'span',
                      text: 'App Store',
                      classes: ['app__text__button__text__platform'],
                    }),
                  ],
                }),
              ],
            }),
            new HtmlElementComponent<'button'>({
              tag: 'button',
              classes: ['app__text__button'],
              children: [
                new SvgElementComponent<'svg'>({
                  tag: 'svg',
                  classes: ['app__text__button__svg'],
                  children: [
                    new SvgElementComponent<'use'>({
                      tag: 'use',
                      attributes: [
                        {
                          name: 'href',
                          value: `./icon.svg#android`,
                        },
                      ],
                    }),
                  ],
                }),
                new HtmlElementComponent<'span'>({
                  tag: 'span',
                  text: 'Available on',
                  classes: ['app__text__button__text'],
                  children: [
                    new HtmlElementComponent<'span'>({
                      tag: 'span',
                      text: 'Google Play',
                      classes: ['app__text__button__text__platform'],
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
