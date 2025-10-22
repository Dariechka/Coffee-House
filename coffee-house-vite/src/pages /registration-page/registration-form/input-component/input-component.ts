import { Input } from './input/input.ts'
import { HtmlElementComponent } from '../../../../share/html-element-component.ts'
import type { InputComponentProps } from '../../../../typing/types.ts'
import { SvgElementComponent } from '../../../../share/svg-element-component.ts'

export class InputContainerComponent extends HtmlElementComponent<'div'> {
  private readonly input: Input

  constructor(props: InputComponentProps) {
    super({
      tag: 'div',
      children: [
        new HtmlElementComponent<'label'>({
          tag: 'label',
          attributes: [
            {
              name: 'for',
              value: props.name.replace(' ', '-'),
            },
          ],
          text: props.name,
          classes: ['registration__form_label'],
        }),
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '16',
            },
            {
              name: 'height',
              value: '16',
            },
            {
              name: 'viewBox',
              value: '0 0 16 16',
            },
          ],
          classes: ['registration__form_error-svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#error`,
                },
              ],
            }),
          ],
        }),
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '16',
            },
            {
              name: 'height',
              value: '16',
            },
            {
              name: 'viewBox',
              value: '0 0 16 16',
            },
          ],
          classes: ['registration__form_correct-svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#correct`,
                },
              ],
            }),
          ],
        }),
      ],
      classes: ['registration__form_item'],
    })

    this.input = new Input({
      ...props,
      addClassToParent: (value: string, flag: boolean = true, text?: string): void =>
        this.changeClass(value, flag, text),
    })
    this.mountChildren(this.input)
  }

  public changeClass(name: string, flag: boolean, text?: string): void {
    if (flag) {
      this.element.classList.remove('registration__form_item_error')
      this.element.classList.remove('registration__form_item_correct')
      if (name === '') {
        return
      }
      this.element.classList.add(name)
      this.mountChildren(this.createErrorMessage(text ?? ''))
    } else {
      this.element.classList.remove('registration__form_item_error')
      this.element.classList.remove('registration__form_item_correct')
      this.element.classList.add(name)
      this.mountChildren(this.createErrorMessage(text ?? ''))
      this.input.checkErrors(text)
    }
  }

  private createErrorMessage(text: string): HtmlElementComponent<'p'> {
    return new HtmlElementComponent<'p'>({
      tag: 'p',
      text: text,
      classes: ['registration__form_item_error-message'],
    })
  }
}
