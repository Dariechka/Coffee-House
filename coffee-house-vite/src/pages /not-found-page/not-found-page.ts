import { HtmlElementComponent } from '../../share/html-element-component.ts'
import './not-found-page.scss'
import { router } from '../../app.ts'

export default class NotFoundPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      children: [
        new HtmlElementComponent<'p'>({
          tag: 'p',
          text: 'Something went wrong',
          classes: ['not-found-page__text'],
        }),
        new HtmlElementComponent<'button'>({
          tag: 'button',
          text: 'Back to the main page',
          listeners: [
            {
              type: 'click',
              value: (): void => router.navigate('main'),
            },
          ],
          classes: ['not-found-page__button'],
        }),
      ],
      classes: ['not-found-page'],
    })
  }
}
