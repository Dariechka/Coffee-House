import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import './menu-page.scss'
import ContactSection from '../../components/contact-section/contact-section.ts'
import Categories from '../../components/categories/categories.ts'

export default class MenuPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['page'],
    })
    this.mountChildren(
      new Header({
        additionalLinkClasses: [],
        additionalMenuClasses: ['header__menu_active'],
      }),
      new Categories(),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )
  }
}
