import { HtmlElementComponent } from '../../../../../share/html-element-component.ts'
import { type InputProps } from '../../../../../typing/types.ts'

export class Input extends HtmlElementComponent<'input'> {
  constructor(private props: InputProps) {
    super({
      tag: 'input',
      listeners: [
        {
          type: 'blur',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLInputElement) {
              const result = props.onUpdate(target.value)
              this.checkErrors(result)
            }
          },
        },
        {
          type: 'focus',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLInputElement) {
              this.changeClass('')
              props.addClassToParent('', true)
            }
          },
        },
        {
          type: 'change',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLInputElement) {
              const result = props.onUpdate(target.value)
              this.checkErrors(result)
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

  public changeClass(name: string): void {
    this.element.classList.remove('registration__form_input_error')
    this.element.classList.remove('registration__form_input_correct')
    if (name === '') return
    this.element.classList.add(name)
  }

  public checkErrors(result?: string): void {
    if (result) {
      this.changeClass('registration__form_input_error')
      this.props.addClassToParent('registration__form_item_error', true, result)
    } else {
      this.changeClass('registration__form_input_correct')
      this.props.addClassToParent('registration__form_item_correct', true)
    }
  }
}
