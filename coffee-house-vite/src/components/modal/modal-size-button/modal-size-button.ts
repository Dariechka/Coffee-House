import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { PriceData, Size } from '../../../typing/types.ts'

export type SizeButtonProps = {
  size: Size
  typeSize: string
}

export default class ModalSizeButton extends HtmlElementComponent<'button'> {
  private readonly size: Size
  constructor(props: SizeButtonProps, callBack: (data: PriceData) => void) {
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
      listeners: [
        {
          type: 'click',
          value: (): void => {
            if (this.containsActiveClass()) {
              return
            }
            callBack(this.getPriceData())
            this.addActiveClass()
          },
        },
      ],
      classes: ['menu__button', 'modal__button'],
    })
    this.size = props.size
  }

  public containsActiveClass(): boolean {
    return this.element.classList.contains('active-button')
  }

  public addActiveClass(): void {
    this.element.classList.add('active-button')
  }

  public removeActiveClass(): void {
    this.element.classList.remove('active-button')
  }

  public getPriceData(): PriceData {
    return {
      price: +this.size.price,
      discountPrice: this.size.discountPrice ? +this.size.discountPrice : 0,
    }
  }
}
