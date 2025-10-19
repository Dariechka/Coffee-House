import './categories.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import { eventType, type Product } from '../../typing/types.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import { fetchProduct, fetchProducts } from '../../share/api.ts'
import MenuList from './menu-list/menu-list.ts'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'
import { isMoreBorderWindowWidth, numberOfCards, timerDelayValue } from '../../utils/calcDelta.ts'
import CategoryButton from './category-button/category-button.ts'
import Modal from '../modal/modal.ts'

export default class Categories extends HtmlElementComponent<'section'> {
  private menuList: MenuList = new MenuList()
  private categories: Array<string> = ['coffee', 'tea', 'dessert']
  private products: Product[] = []
  private readonly loadButton: HtmlElementComponent<'button'>
  private readonly buttonContainer: Array<CategoryButton>
  private activeCategory: string = 'coffee'

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
      button.handleEvent('click', () => {
        this.activeCategory = button.getTextContent()
        this.handleButtonClick()
      })
    })
    window.addEventListener('resize', () => this.checkNumberAndRenderCards())
    this.loadButton.handleEvent('click', () => this.renderAllCards())

    this.on(eventType.fetchProductData, (id: string) => this.handleFetchProductData(id))
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

  private handleButtonClick(): void {
    this.buttonContainer.forEach((button): void => button.removeClassFromButton('active-button'))
    this.buttonContainer
      .find((button) => button.isCategoriesTheSame(this.activeCategory))
      ?.addClassToButton('active-button')
    this.checkNumberAndRenderCards()
  }

  private async loadProducts(): Promise<void> {
    this.menuList.mountChildren(new Loader())
    setTimeout(async () => {
      const response = await fetchProducts()
      if (typeof response === 'string') {
        this.menuList.clearList()
        this.menuList.mountChildren(new ErrorMessage('Something went wrong. Please, refresh the page'))
      } else {
        this.products = response.data
        this.activeCategory = this.categories[0]
        this.buttonContainer
          .find((button) => button.isCategoriesTheSame(this.categories[0]))
          ?.addClassToButton('active-button')
        this.checkNumberAndRenderCards()
      }
    }, timerDelayValue)
  }

  private renderFirstFourCards(): void {
    this.menuList.clearList()
    this.menuList.renderCards(
      this.products.filter((product) => product.category === this.activeCategory).slice(0, numberOfCards)
    )
    this.loadButton.changeDisplay('flex')
  }

  private renderAllCards(): void {
    this.menuList.clearList()
    this.menuList.renderCards(this.products.filter((product) => product.category === this.activeCategory))
    this.loadButton.changeDisplay('none')
  }

  private checkNumberAndRenderCards(): void {
    if (isMoreBorderWindowWidth()) {
      this.renderAllCards()
    } else {
      this.renderFirstFourCards()
    }
  }

  private handleFetchProductData(id: string): void {
    this.emit(eventType.openBackground)
    const modal = new Modal()
    this.prependChildren(modal)
    modal.renderLoader()
    setTimeout(async () => {
      const response = await fetchProduct(id)
      modal.clearModal()
      if (typeof response === 'string') {
        modal.renderError()
      } else {
        const product = response.data
        modal.renderProduct(product)
      }
    }, timerDelayValue)
  }
}
