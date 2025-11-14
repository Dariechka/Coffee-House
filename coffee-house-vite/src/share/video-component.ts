import { HtmlElementComponent } from './html-element-component.ts'
import type { HtmlElementParameters } from '../typing/types.ts'

export default class VideoHtmlComponent extends HtmlElementComponent<'video'> {
  constructor(parameters: Omit<HtmlElementParameters<'video'>, 'tag'>, muted?: boolean) {
    super({ ...parameters, tag: 'video' })
    this.element.muted = muted ?? true
  }

  public setMuted(muted: boolean): void {
    this.element.muted = muted
  }
}
