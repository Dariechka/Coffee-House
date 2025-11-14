import { ElementComponent } from './element-component.ts'
import type { SvgElementParameters } from '../typing/types.ts'

export class SvgElementComponent<K extends keyof SVGElementTagNameMap> extends ElementComponent<
  SVGElementTagNameMap[K]
> {
  constructor(parameters: SvgElementParameters<K>) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', parameters.tag)
    super(element, parameters)
  }
}
