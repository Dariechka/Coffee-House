import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { Additive, PriceData } from '../../../typing/types.ts'

export type AdditiveButtonProps = {
  additive: Additive
  index: number
}

export default class ModalAdditiveButton extends HtmlElementComponent<'button'> {
  private readonly additive: Additive
  constructor(props: AdditiveButtonProps, callBack: (data: PriceData, twice: boolean) => void) {
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
      listeners: [
        {
          type: 'click',
          value: (): void => {
            if (!this.containsActiveClass()) {
              callBack(this.getPriceData(), false)
            } else {
              callBack(this.getPriceData(), true)
            }
            this.toggleActiveClass()
          },
        },
      ],
      classes: ['menu__button', 'modal__button'],
    })
    this.additive = props.additive
  }

  public containsActiveClass(): boolean {
    return this.element.classList.contains('active-button')
  }

  public toggleActiveClass(): void {
    this.element.classList.toggle('active-button')
  }

  public getPriceData(): PriceData {
    return {
      price: +this.additive.price,
      discountPrice: this.additive.discountPrice ? +this.additive.discountPrice : 0,
    }
  }
}
