import type { ElementComponent } from '../share/element-component.ts'

export type ElementParameters = {
  classes?: Array<string>
  text?: string
  attributes?: Array<AttributesType>
  listeners?: Array<EventListener>
  children?: Array<ElementComponent<Element>>
}

export type HtmlElementParameters<K extends keyof HTMLElementTagNameMap = 'div'> = {
  tag: K
} & ElementParameters

export type SvgElementParameters<K extends keyof SVGElementTagNameMap> = {
  tag: K
} & ElementParameters

export type AttributesType = {
  name: string
  value: string
}

export type EventListener = {
  type: string
  value: (data: Event) => void
}
