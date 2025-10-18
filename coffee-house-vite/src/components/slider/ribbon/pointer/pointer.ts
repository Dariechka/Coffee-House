import { HtmlElementComponent } from '../../../../share/html-element-component.ts'

export default class Pointer extends HtmlElementComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
      classes: ['favorite__pointers_pointer'],
    })
  }
}
