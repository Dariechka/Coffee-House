import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { PriceData, Size } from '../../../typing/types.ts'
import Tooltip from '../../tooltip/tooltip.ts'

export type SizeButtonProps = {
  size: Size
  typeSize: string
}

export default class ModalSizeButton extends HtmlElementComponent<'button'> {
  private readonly size: Size
  private readonly tooltip: Tooltip
  constructor(props: SizeButtonProps, callBack: (data: PriceData, size: string) => void, isSignIn: boolean) {
    super({
      tag: 'button',
      listeners: [
        {
          type: 'click',
          value: (): void => {
            if (this.containsActiveClass()) {
              return
            }
            callBack(this.getPriceData(), props.size.size)
            this.addActiveClass()
          },
        },
        {
          type: 'pointerover',
          value: (): void => this.tooltip.appear(),
        },
        {
          type: 'pointerout',
          value: (): void => this.tooltip.disappear(),
        },
      ],
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
    this.tooltip = new Tooltip(this.getPriceData(), isSignIn)
    this.tooltip.disappear()
    this.mountChildren(this.tooltip)
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
