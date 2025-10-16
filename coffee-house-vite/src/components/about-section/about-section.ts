import './about-section.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'

export default class AboutSection extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      attributes: [
        {
          name: 'id',
          value: 'about',
        },
      ],
      classes: ['about'],
    })
    this.mountChildren(new Container(['about__container'], [this.createTitle(), this.createGallery()]))
  }

  private createTitle(): HtmlElementComponent<'h2'> {
    return new HtmlElementComponent<'h2'>({
      tag: 'h2',
      text: 'Resource is ',
      classes: ['about__title'],
      children: [
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: 'the perfect and cozy place ',
          classes: ['about__title_italic'],
        }),
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: 'where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.',
          classes: ['about__title'],
        }),
      ],
    })
  }
  private createGallery(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['about__gallery'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['about__gallery__image', 'about__gallery__image_1'],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['about__gallery__image', 'about__gallery__image_2'],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['about__gallery__image', 'about__gallery__image_3'],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['about__gallery__image', 'about__gallery__image_4'],
        }),
      ],
    })
  }
}
