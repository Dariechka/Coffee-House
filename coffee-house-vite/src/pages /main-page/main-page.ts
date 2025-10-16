import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Header from '../../components/header/header.ts'
import './main-page.scss'
import ContactSection from '../../components/contact-section/contact-section.ts'
import AppSection from '../../components/app-section/app-section.ts'
import AboutSection from '../../components/about-section/about-section.ts'
import EnjoySection from '../../components/enjoy-section/enjoy-section.ts'
import FavoriteSection from '../../components/favorite-section/favorite-section.ts'

export default class MainPage extends HtmlElementComponent<'section'> {
  constructor() {
    super({
      tag: 'section',
      classes: ['main-page'],
    })
    this.mountChildren(
      new Header({
        additionalLinkClasses: ['header__logo_active'],
        additionalMenuClasses: [],
      }),
      new EnjoySection(),
      new FavoriteSection(),
      new AboutSection(),
      new AppSection(),
      new HtmlElementComponent<'footer'>({
        tag: 'footer',
        children: [new ContactSection()],
      })
    )
  }
}
