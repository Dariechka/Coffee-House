import type { HtmlElementParameters } from '../typing/types.ts'
import { ElementComponent } from './element-component.ts'

export class HtmlElementComponent<K extends keyof HTMLElementTagNameMap> extends ElementComponent<
  HTMLElementTagNameMap[K]
> {
  constructor(parameters: HtmlElementParameters<K>) {
    const element = document.createElement(parameters.tag)
    super(element, parameters)
  }
}
