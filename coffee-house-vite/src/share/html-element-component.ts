import type { HtmlElementParameters } from '../typing/types.ts'
import { ElementComponent } from './element-component.ts'

export class HtmlElementComponent<K extends keyof HTMLElementTagNameMap> extends ElementComponent<
  HTMLElementTagNameMap[K]
> {
  constructor(parameters: HtmlElementParameters<K>) {
    const element = document.createElement(parameters.tag)
    super(element, parameters)
  }

  public translate(translationPx: number): void {
    this.element.style.transform = `translateX(${translationPx}px)`
  }

  public setImage(path: string): void {
    this.element.style.backgroundImage = `url('${path}')`
  }

  public changeDisplay(display: 'none' | 'flex' | 'block'): void {
    this.element.style.display = display
  }

  public changePosition(position: 'left' | 'right'): void {
    this.element.style.backgroundPosition = position
  }

  public containsEvent(event: MouseEvent): boolean {
    const target = event.target
    return target instanceof Node && this.element.contains(target)
  }

  public changeTopValue(offset: number): void {
    this.element.style.top = offset + 'px'
  }

  public changeTextContent(text: string): void {
    this.element.textContent = text
  }

  public addAttribute(attributeName: string, value: string): void {
    this.element.setAttribute(attributeName, value)
  }

  public removeAttribute(attributeName: string): void {
    this.element.removeAttribute(attributeName)
  }

  public hasAttribute(attributeName: string): boolean {
    return this.element.hasAttribute(attributeName)
  }

  public addClassToElement(name: string): void {
    this.element.classList.add(name)
  }

  public removeClassToElement(name: string): void {
    this.element.classList.remove(name)
  }
}
