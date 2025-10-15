import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'

export default class Header extends HtmlElementComponent<'header'> {
  constructor() {
    super({
      tag: 'header',
      children: [new Container('header__container')],
      classes: ['header'],
    })
  }
}
