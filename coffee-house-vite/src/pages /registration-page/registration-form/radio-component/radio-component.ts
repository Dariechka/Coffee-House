import { HtmlElementComponent } from '../../../../share/html-element-component.ts'

export class RadioComponent extends HtmlElementComponent<'fieldset'> {
  private readonly cashInput: HtmlElementComponent<'input'>
  private readonly cardInput: HtmlElementComponent<'input'>

  constructor(private onUpdate: (value: 'card' | 'cash') => void) {
    super({
      tag: 'fieldset',
      children: [
        new HtmlElementComponent<'legend'>({
          tag: 'legend',
          text: 'Pay By',
          classes: ['registration__form_label'],
        }),
      ],
      classes: ['registration__form_fieldset'],
    })
    this.cashInput = this.createRadioInput('cash')
    this.cardInput = this.createRadioInput('card')
    this.cashInput.addAttribute('checked', '')
    this.mountChildren(
      this.createInputContainer('cash', this.cashInput),
      this.createInputContainer('card', this.cardInput)
    )
  }

  private createInputContainer(label: string, input: HtmlElementComponent<'input'>): HtmlElementComponent<'label'> {
    return new HtmlElementComponent<'label'>({
      tag: 'label',
      text: label
        .split('')
        .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
        .join(''),
      classes: ['registration__form_item_radio'],
      children: [
        input,
        new HtmlElementComponent<'span'>({
          tag: 'span',
          classes: ['registration__form_item_radio_state'],
          children: [
            new HtmlElementComponent<'span'>({
              tag: 'span',
              classes: ['registration__form_item_radio_circle'],
            }),
          ],
        }),
      ],
    })
  }
  private createRadioInput(name: string): HtmlElementComponent<'input'> {
    return new HtmlElementComponent<'input'>({
      tag: 'input',
      attributes: [
        {
          name: 'type',
          value: 'radio',
        },
        {
          name: 'name',
          value: 'payment',
        },
        {
          name: 'value',
          value: name,
        },
      ],
      listeners: [
        {
          type: 'change',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLInputElement) {
              this.changePaymentMethod(target.value)
            } else {
              throw new Error(`Unexpected type of target ${target}`)
            }
          },
        },
      ],
      classes: ['registration__form_input_radio'],
    })
  }

  private changePaymentMethod(value: string): void {
    if (value !== 'card' && value !== 'cash') {
      return
    }
    this.onUpdate(value)
  }
}
