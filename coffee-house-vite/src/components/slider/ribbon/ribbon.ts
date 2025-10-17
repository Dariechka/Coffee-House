import { HtmlElementComponent } from '../../../share/html-element-component.ts'
import type { ElementComponent } from '../../../share/element-component.ts'

export default class Ribbon extends HtmlElementComponent<'div'> {
  constructor() {
    super({
      tag: 'div',
      classes: ['favorite__slider__ribbon'],
    })
  }

  private get htmlChildren(): Array<HtmlElementComponent<keyof HTMLElementTagNameMap>> {
    return this.children.filter((child) => child instanceof HtmlElementComponent)
  }

  public clearRibbon(): void {
    this.children.forEach((child: ElementComponent<Element>): void => child.unmount())
  }

  public addClass(name: string): void {
    this.addClassToChildren(name)
  }

  public removeClass(name: string): void {
    this.removeClassFromChildren(name)
  }

  public translateChildren(translationPx: number): void {
    for (const child of this.htmlChildren) {
      child.translate(translationPx)
    }
  }
}
