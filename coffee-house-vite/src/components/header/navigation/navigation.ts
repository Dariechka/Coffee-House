import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import { router } from '../../../app.ts'
import type { PageList } from '../../../router/pages.ts'

type AnchorLinks = 'about' | 'mobile-app' | 'favorite-coffee' | 'contact-us'

export default class Navigation extends HtmlElementComponent<'header'> {
  constructor(private page: PageList) {
    super({
      tag: 'header',
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          listeners: [
            {
              type: 'click',
              value: (): void => this.scrollPage('favorite-coffee'),
            },
          ],
          text: 'Favorite coffee',
          classes: ['header__navigation_item'],
        }),
        new HtmlElementComponent<'a'>({
          tag: 'a',
          listeners: [
            {
              type: 'click',
              value: (): void => this.scrollPage('about'),
            },
          ],
          text: 'About',
          classes: ['header__navigation_item'],
        }),
        new HtmlElementComponent<'a'>({
          tag: 'a',
          listeners: [
            {
              type: 'click',
              value: (): void => this.scrollPage('mobile-app'),
            },
          ],
          text: 'Mobile app',
          classes: ['header__navigation_item'],
        }),
        new HtmlElementComponent<'a'>({
          tag: 'a',
          listeners: [
            {
              type: 'click',
              value: (): void => this.scrollPage('contact-us'),
            },
          ],
          text: 'Contact us',
          classes: ['header__navigation_item'],
        }),
      ],
      classes: ['header__navigation'],
    })
  }

  private scrollPage(link: AnchorLinks): void {
    if (link === 'contact-us') {
      router.pushHistory(`${this.page}#contact-us`)
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    }
  }
}
