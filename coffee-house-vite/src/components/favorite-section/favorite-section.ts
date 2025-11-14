import './favorite-section.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import Slider from '../slider/slider.ts'

export default class FavoriteSection extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      attributes: [
        {
          name: 'id',
          value: 'favorite-coffee',
        },
      ],
      classes: ['favorite'],
    })
    this.mountChildren(new Container(['favorite__container'], [this.createTitle(), new Slider()]))
  }

  private createTitle(): HtmlElementComponent<'h2'> {
    return new HtmlElementComponent<'h2'>({
      tag: 'h2',
      text: 'Choose your ',
      classes: ['favorite__title'],
      children: [
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: 'favorite ',
          classes: ['favorite__title_italic'],
        }),
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: 'coffee',
          classes: ['favorite__title'],
        }),
      ],
    })
  }
}
