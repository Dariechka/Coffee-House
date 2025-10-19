import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { Additive } from '../../../typing/types.ts'

export type AdditiveButtonProps = {
  additive: Additive
  index: number
}

export default class ModalAdditiveButton extends HtmlElementComponent<'button'> {
  private readonly additive: Additive
  constructor(props: AdditiveButtonProps) {
    super({
      tag: 'button',
      children: [
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: (props.index + 1).toString(),
          classes: ['menu__button_circle'],
        }),
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: props.additive.name,
          classes: ['menu__button_text'],
        }),
      ],
      classes: ['menu__button', 'modal__button'],
    })
    this.additive = props.additive
    console.log(this.additive)
  }
}
