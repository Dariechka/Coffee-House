import { HtmlElementComponent } from '../../../share/html-element-component.ts'

export default class Navigation extends HtmlElementComponent<'header'> {
  constructor(callBack: () => void) {
    super({
      tag: 'header',
      children: [
        new HtmlElementComponent<'a'>({
          tag: 'a',
          attributes: [
            {
              name: 'href',
              value: 'main#favorite-coffee',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: (): void => callBack(),
            },
          ],
          text: 'Favorite coffee',
          classes: ['header__navigation_item'],
        }),
        new HtmlElementComponent<'a'>({
          tag: 'a',
          attributes: [
            {
              name: 'href',
              value: 'main#about',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: (): void => callBack(),
            },
          ],
          text: 'About',
          classes: ['header__navigation_item'],
        }),
        new HtmlElementComponent<'a'>({
          tag: 'a',
          attributes: [
            {
              name: 'href',
              value: 'main#mobile-app',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: (): void => callBack(),
            },
          ],
          text: 'Mobile app',
          classes: ['header__navigation_item'],
        }),
        new HtmlElementComponent<'a'>({
          tag: 'a',
          attributes: [
            {
              name: 'href',
              value: '#contact-us',
            },
          ],
          listeners: [
            {
              type: 'click',
              value: (): void => callBack(),
            },
          ],
          text: 'Contact us',
          classes: ['header__navigation_item'],
        }),
      ],
      classes: ['header__navigation'],
    })
  }
}
