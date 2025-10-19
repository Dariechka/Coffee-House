import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { Size } from '../../../typing/types.ts'

export type SizeButtonProps = {
  size: Size
  typeSize: string
}

export default class ModalSizeButton extends HtmlElementComponent<'button'> {
  private readonly size: Size
  constructor(props: SizeButtonProps) {
    super({
      tag: 'button',
      children: [
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: props.typeSize.toUpperCase(),
          classes: ['menu__button_circle'],
        }),
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: props.size.size,
          classes: ['menu__button_text'],
        }),
      ],
      classes: ['menu__button', 'modal__button'],
    })
    this.size = props.size
  }

  private f(): void {
    console.log(this.size)
  }
}
