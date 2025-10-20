import { HtmlElementComponent } from '../../share/html-element-component.ts'
import './not-found-page.scss'
import { router } from '../../app.ts'
import Header from '../../components/header/header.ts'
import Container from '../../components/container/container.ts'
import ContactSection from '../../components/contact-section/contact-section.ts'

export default class NotFoundPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      children: [
        new Header({
          page: 'not-found',
          additionalLinkClasses: [],
          additionalMenuClasses: [],
        }),
        new Container(
          ['not-found-page__container'],
          [
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
          ]
        ),
        new HtmlElementComponent<'footer'>({
          tag: 'footer',
          children: [new ContactSection()],
        }),
      ],
      classes: ['not-found-page'],
    })
  }
}
