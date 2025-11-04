import './loader.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'

export default class Loader extends HtmlElementComponent<'span'> {
  constructor() {
    super({
      tag: 'span',
      classes: ['loader'],
    })
  }
}
