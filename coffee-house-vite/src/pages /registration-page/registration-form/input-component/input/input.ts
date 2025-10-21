import { HtmlElementComponent } from '../../../../../share/html-element-component.ts'
import type { InputProps } from '../../../../../typing/types.ts'

export class Input extends HtmlElementComponent<'input'> {
  constructor(props: InputProps) {
    super({
      tag: 'input',
      listeners: [
        {
          type: 'input',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLInputElement) {
              props.onUpdate(target.value)
            } else {
              throw new Error(`Unexpected type of target ${target}`)
            }
          },
        },
      ],
      attributes: [
        {
          name: 'type',
          value: props.type.replace(' ', '-'),
        },
        {
          name: 'placeholder',
          value: props.name,
        },
        {
          name: 'id',
          value: props.name.replace(' ', '-'),
        },
        {
          name: 'name',
          value: props.name.replace(' ', '-'),
        },
        {
          name: 'autocomplete',
          value: 'off',
        },
        {
          name: 'required',
          value: '',
        },
        {
          name: 'min',
          value: props.min ?? '',
        },
      ],
      classes: ['registration__form_input', ...props.classes],
    })
  }

  public getValue(): string {
    return this.element.value
  }

  public setClass(name: string): void {
    this.element.classList.add(name)
  }

  public removeClass(name: string): void {
    this.element.classList.remove(name)
  }
}
