import { Input } from './input/input.ts'
import { HtmlElementComponent } from '../../../../share/html-element-component.ts'
import type { InputProps } from '../../../../typing/types.ts'
import { SvgElementComponent } from '../../../../share/svg-element-component.ts'

export class InputContainerComponent extends HtmlElementComponent<'div'> {
  private readonly input: Input

  constructor(props: InputProps) {
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

    this.input = new Input(props)
    this.mountChildren(this.input)
  }

  public getInputValue(): string {
    return this.input.getValue()
  }

  public setInputClass(name: string, inputName: string): void {
    this.input.setClass(inputName)
    this.element.classList.add(name)
  }

  public removeClass(name: string, inputName: string): void {
    this.input.removeClass(inputName)
    this.element.classList.remove(name)
  }
}
