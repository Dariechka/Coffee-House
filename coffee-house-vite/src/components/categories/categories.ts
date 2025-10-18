import './categories.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import type { Product } from '../../typing/types.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import { fetchProducts } from '../../share/api.ts'
import MenuList from './menu-list/menu-list.ts'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'
import { timerDelayValue } from '../../utils/calcDelta.ts'
import CategoryButton from './category-button/category-button.ts'

export default class Categories extends HtmlElementComponent<'section'> {
  private menuList: MenuList = new MenuList()
  private categories: Array<string> = ['coffee', 'tea', 'dessert']
  private products: Product[] = []
  private loadButton: HtmlElementComponent<'button'>
  private buttonContainer: Array<CategoryButton>

  constructor() {
    super({
      tag: 'section',
      classes: ['menu'],
    })
    this.buttonContainer = this.categories.map((category) => new CategoryButton(category))
    this.loadButton = this.createLoadButton()

    this.mountChildren(
      new Container(
        ['menu__container'],
        [this.createTitle(), this.creatButtonContainer(), this.menuList, this.loadButton]
      )
    )
    this.loadProducts()

    this.buttonContainer.forEach((button) => {
      button.handleEvent('click', () => this.handleButtonClick(button.getTextContent()))
    })

    window.addEventListener('resize', () => {
      this.loadButton.changeDisplay('flex')
    })
  }

  private createTitle(): HtmlElementComponent<'h1'> {
    return new HtmlElementComponent<'h1'>({
      tag: 'h1',
      text: 'Behind each of our cups hides an ',
      classes: ['menu__title'],
      children: [
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: 'amazing surprise',
          classes: ['menu__title_italic'],
        }),
      ],
    })
  }
  private creatButtonContainer(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['menu__buttons-container'],
      children: [...this.buttonContainer],
    })
  }
  private createLoadButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      classes: ['menu__load-button'],
      children: [
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          classes: ['menu__load-button_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#load`,
                },
              ],
            }),
          ],
        }),
      ],
    })
  }

  private handleButtonClick(category: string): void {
    this.buttonContainer.forEach((button): void => button.removeClassFromButton('active-button'))
    this.menuList.clearList()
    this.menuList.renderCards(this.products.filter((product) => product.category === category))
    this.buttonContainer.find((button) => button.isCategoriesTheSame(category))?.addClassToButton('active-button')
  }

  private async loadProducts(): Promise<void> {
    this.menuList.mountChildren(new Loader())
    setTimeout(async () => {
      const response = await fetchProducts()
      this.menuList.clearList()
      if (typeof response === 'string') {
        this.menuList.mountChildren(new ErrorMessage('Something went wrong. Please, refresh the page'))
      } else {
        this.products = response.data
        this.menuList.renderCards(this.products.filter((product) => product.category === this.categories[0]))
        this.buttonContainer
          .find((button) => button.isCategoriesTheSame(this.categories[0]))
          ?.addClassToButton('active-button')
      }
    }, timerDelayValue)
  }
}
