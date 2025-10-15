import { HtmlElementComponent } from '../share/html-element-component.ts'

export default class RootElement extends HtmlElementComponent<'main'> {
  private currentPage: HtmlElementComponent<keyof HTMLElementTagNameMap> | null = null

  constructor() {
    super({
      tag: 'main',
      classes: ['root-container'],
    })
  }

  public mountTo(parent: HTMLElement): void {
    parent.appendChild(this.element)
  }

  public setPage(page: HtmlElementComponent<keyof HTMLElementTagNameMap>): void {
    if (this.currentPage) {
      this.currentPage.unmount()
    }
    this.currentPage = page
    this.currentPage.mountToParent(this)
  }
}
