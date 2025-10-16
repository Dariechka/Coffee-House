import './contact-section.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'

export default class ContactSection extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      attributes: [
        {
          name: 'id',
          value: 'contact-us',
        },
      ],
      classes: ['contact'],
    })
    this.mountChildren(new Container([], [this.creatContent()]))
  }

  private creatContent(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['contact__container'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['contact__title'],
          children: [
            new HtmlElementComponent<'h2'>({
              tag: 'h2',
              text: 'Sip, Savor, Smile. ',
              classes: ['contact__title_title'],
              children: [
                new HtmlElementComponent<'span'>({
                  tag: 'span',
                  text: 'It’s coffee time!',
                  classes: ['contact__title_title_italic'],
                }),
              ],
            }),
            new HtmlElementComponent<'div'>({
              tag: 'div',
              classes: ['contact__social-media'],
              children: [
                new HtmlElementComponent<'button'>({
                  tag: 'button',
                  classes: ['contact__social-media__button'],
                  children: [
                    new SvgElementComponent<'svg'>({
                      tag: 'svg',
                      classes: ['contact__social-media__button__svg'],
                      children: [
                        new SvgElementComponent<'use'>({
                          tag: 'use',
                          attributes: [
                            {
                              name: 'href',
                              value: `./icon.svg#twitter`,
                            },
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new HtmlElementComponent<'button'>({
                  tag: 'button',
                  classes: ['contact__social-media__button'],
                  children: [
                    new SvgElementComponent<'svg'>({
                      tag: 'svg',
                      classes: ['contact__social-media__button__svg'],
                      children: [
                        new SvgElementComponent<'use'>({
                          tag: 'use',
                          attributes: [
                            {
                              name: 'href',
                              value: `./icon.svg#instagram`,
                            },
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new HtmlElementComponent<'button'>({
                  tag: 'button',
                  classes: ['contact__social-media__button'],
                  children: [
                    new SvgElementComponent<'svg'>({
                      tag: 'svg',
                      classes: ['contact__social-media__button__svg'],
                      children: [
                        new SvgElementComponent<'use'>({
                          tag: 'use',
                          attributes: [
                            {
                              name: 'href',
                              value: `./icon.svg#facebook`,
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
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['contact__info'],
          children: [
            new HtmlElementComponent<'h3'>({
              tag: 'h3',
              text: 'Contact us',
              classes: ['contact__info__title'],
            }),
            new HtmlElementComponent<'ul'>({
              tag: 'ul',
              classes: ['contact__info__list'],
              children: [
                new HtmlElementComponent<'li'>({
                  tag: 'li',
                  classes: ['contact__info__list_item'],
                  children: [
                    new HtmlElementComponent<'a'>({
                      tag: 'a',
                      attributes: [
                        {
                          name: 'target',
                          value: '_blank',
                        },
                        {
                          name: 'href',
                          value:
                            'https://www.google.com/maps/place/Green+Moore+Rd,+Louisiana+70661,+USA/@30.2835013,-93.6835997,813m/data=!3m1!1e3!4m15!1m8!3m7!1s0x863bfca8e71a9973:0xcffc575a39443e57!2sGreen+Moore+Rd,+Louisiana+70661,+USA!3b1!8m2!3d30.2834967!4d-93.6810194!16s%2Fg%2F1thz20sz!3m5!1s0x863bfca8e71a9973:0xcffc575a39443e57!8m2!3d30.2834967!4d-93.6810194!16s%2Fg%2F1thz20sz?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D',
                        },
                      ],
                      classes: ['contact__info__list_item_link'],
                      children: [
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
                          classes: ['contact__info__list_item_svg'],
                          children: [
                            new SvgElementComponent<'use'>({
                              tag: 'use',
                              attributes: [
                                {
                                  name: 'href',
                                  value: `./icon.svg#map`,
                                },
                              ],
                            }),
                          ],
                        }),
                        new HtmlElementComponent<'h3'>({
                          tag: 'h3',
                          text: '8558 Green Rd., LA',
                          classes: ['contact__info__list_item_text'],
                        }),
                      ],
                    }),
                  ],
                }),
                new HtmlElementComponent<'li'>({
                  tag: 'li',
                  classes: ['contact__info__list_item'],
                  children: [
                    new HtmlElementComponent<'a'>({
                      tag: 'a',
                      attributes: [
                        {
                          name: 'href',
                          value: `tel:+16035550123`,
                        },
                      ],
                      classes: ['contact__info__list_item_link'],
                      children: [
                        new SvgElementComponent<'svg'>({
                          tag: 'svg',
                          attributes: [
                            {
                              name: 'width',
                              value: '19',
                            },
                            {
                              name: 'height',
                              value: '19',
                            },
                            {
                              name: 'viewBox',
                              value: '0 0 19 19',
                            },
                          ],
                          classes: ['contact__info__list_item_svg'],
                          children: [
                            new SvgElementComponent<'use'>({
                              tag: 'use',
                              attributes: [
                                {
                                  name: 'href',
                                  value: `./icon.svg#phone`,
                                },
                              ],
                            }),
                          ],
                        }),
                        new HtmlElementComponent<'h3'>({
                          tag: 'h3',
                          text: '+1 (603) 555-0123',
                          classes: ['contact__info__list_item_text'],
                        }),
                      ],
                    }),
                  ],
                }),
                new HtmlElementComponent<'li'>({
                  tag: 'li',
                  classes: ['contact__info__list_item'],
                  children: [
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
                      classes: ['contact__info__list_item_svg'],
                      children: [
                        new SvgElementComponent<'use'>({
                          tag: 'use',
                          attributes: [
                            {
                              name: 'href',
                              value: `./icon.svg#clock`,
                            },
                          ],
                        }),
                      ],
                    }),
                    new HtmlElementComponent<'h3'>({
                      tag: 'h3',
                      text: 'Mon-Sat: 9:00 AM – 23:00 PM',
                      classes: ['contact__info__list_item_li'],
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
