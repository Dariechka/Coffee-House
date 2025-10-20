import { HtmlElementComponent } from '../../share/html-element-component.ts'
import './menu-page.scss'
import ContactSection from '../../components/contact-section/contact-section.ts'
import Categories from '../../components/categories/categories.ts'
import { eventType } from '../../typing/types.ts'
import Header from '../../components/header/header.ts'

export default class MenuPage extends HtmlElementComponent<'section'> {
  private readonly background: HtmlElementComponent<'div'>

  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
    this.background = new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['background'],
    })
    this.mountChildren(
      this.background,
      new Header({
        page: 'menu',
        additionalLinkClasses: [],
        additionalMenuClasses: ['header__menu_active'],
      }),
      new Categories(),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )
    this.on(eventType.openBackground, () => {
      document.body.classList.add('no-scroll')
      this.background.changeDisplay('block')
    })
    this.on(eventType.closeBackground, () => {
      document.body.classList.remove('no-scroll')
      this.background.changeDisplay('none')
    })
  }
}
