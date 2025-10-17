import './categories.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import Container from '../container/container.ts'
import type { Category, Product } from '../../typing/types.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import { fetchProducts } from '../../share/api.ts'
import MenuList from './menu-list/menu-list.ts'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'
import { timerDelayValue } from '../../utils/calcDelta.ts'

export default class Categories extends HtmlElementComponent<'section'> {
  private menuList: MenuList = new MenuList()
  private categories: Category[] = ['coffee', 'tea', 'dessert']
  private products: Product[] = []

  constructor() {
    super({
      tag: 'section',
      classes: ['menu'],
    })
    this.mountChildren(
      new Container(
        ['menu__container'],
        [this.createTitle(), this.creatButtonContainer(), this.menuList, this.createLoadButton()]
      )
    )

    this.loadProducts()
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
      children: [
        new HtmlElementComponent<'button'>({
          tag: 'button',
          classes: ['menu__button', 'active-button'],
          children: [
            new HtmlElementComponent<'span'>({
              tag: 'span',
              classes: ['menu__button_circle'],
              children: [
                new HtmlElementComponent<'img'>({
                  tag: 'img',
                  classes: ['menu__button_img'],
                  attributes: [
                    {
                      name: 'alt',
                      value: 'coffee',
                    },
                    {
                      name: 'src',
                      value: './images/cup.png',
                    },
                  ],
                }),
              ],
            }),
            new HtmlElementComponent<'span'>({
              tag: 'span',
              text: 'Coffee',
              classes: ['menu__button_text'],
            }),
          ],
        }),
        new HtmlElementComponent<'button'>({
          tag: 'button',
          classes: ['menu__button'],
          children: [
            new HtmlElementComponent<'span'>({
              tag: 'span',
              classes: ['menu__button_circle'],
              children: [
                new HtmlElementComponent<'img'>({
                  tag: 'img',
                  classes: ['menu__button_img'],
                  attributes: [
                    {
                      name: 'alt',
                      value: 'teapot',
                    },
                    {
                      name: 'src',
                      value: './images/teapot.png',
                    },
                  ],
                }),
              ],
            }),
            new HtmlElementComponent<'span'>({
              tag: 'span',
              text: 'Tea',
              classes: ['menu__button_text'],
            }),
          ],
        }),
        new HtmlElementComponent<'button'>({
          tag: 'button',
          classes: ['menu__button'],
          children: [
            new HtmlElementComponent<'span'>({
              tag: 'span',
              classes: ['menu__button_circle'],
              children: [
                new HtmlElementComponent<'img'>({
                  tag: 'img',
                  classes: ['menu__button_img'],
                  attributes: [
                    {
                      name: 'alt',
                      value: 'dessert',
                    },
                    {
                      name: 'src',
                      value: './images/dessert.png',
                    },
                  ],
                }),
              ],
            }),
            new HtmlElementComponent<'span'>({
              tag: 'span',
              text: 'Dessert',
              classes: ['menu__button_text'],
            }),
          ],
        }),
      ],
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

  private async loadProducts(): Promise<void> {
    this.menuList.mountChildren(new Loader())
    setTimeout(async () => {
      const response = await fetchProducts()
      this.menuList.clearList()
      if (typeof response === 'string') {
        this.menuList.mountChildren(new ErrorMessage('Something went wrong. Please, refresh the page'))
      } else {
        this.products = response.data
        this.menuList.renderCards(this.products.filter((product) => product.category === 'coffee'))
      }
    }, timerDelayValue)
  }
}
