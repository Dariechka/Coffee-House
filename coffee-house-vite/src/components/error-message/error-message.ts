import './error-message.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'

export default class ErrorMessage extends HtmlElementComponent<'p'> {
  constructor(message: string) {
    super({
      tag: 'p',
      text: message,
      classes: ['error-message'],
    })
  }
}
