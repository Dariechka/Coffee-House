import './slider.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import type { Product } from '../../typing/types.ts'
import { fetchFavoriteProducts } from '../../share/api.ts'
import Ribbon from './ribbon/ribbon.ts'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'

export default class Slider extends HtmlElementComponent<'div'> {
  private readonly leftButton: HtmlElementComponent<'button'>
  private readonly rightButton: HtmlElementComponent<'button'>
  private readonly ribbon = new Ribbon()
  private readonly pointersList: HtmlElementComponent<'div'>

  private favouriteCoffee: Array<Product> = []

  constructor() {
    super({
      tag: 'div',
      classes: ['favorite__slider-container'],
    })
    this.leftButton = this.creatLeftButton()
    this.rightButton = this.creatRightButton()
    this.pointersList = this.creatPointersList()

    this.mountChildren(this.createContainer(), this.creatPointersList())

    this.loadData()
  }

  private creatLeftButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      classes: ['favorite__slider__button', 'left'],
      children: [
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '14',
            },
            {
              name: 'height',
              value: '14',
            },
            {
              name: 'viewBox',
              value: '0 0 14 14',
            },
          ],
          classes: ['favorite__slider__button_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#left`,
                },
              ],
            }),
          ],
        }),
      ],
    })
  }
  private creatRightButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      classes: ['favorite__slider__button', 'right'],
      children: [
        new SvgElementComponent<'svg'>({
          tag: 'svg',
          attributes: [
            {
              name: 'width',
              value: '14',
            },
            {
              name: 'height',
              value: '14',
            },
            {
              name: 'viewBox',
              value: '0 0 14 14',
            },
          ],
          classes: ['favorite__slider__button_svg'],
          children: [
            new SvgElementComponent<'use'>({
              tag: 'use',
              attributes: [
                {
                  name: 'href',
                  value: `./icon.svg#right`,
                },
              ],
            }),
          ],
        }),
      ],
    })
  }
  private createContainer(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['favorite__slider'],
      children: [this.leftButton, this.ribbon, this.rightButton],
    })
  }
  private creatPointersList(): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['favorite__pointers'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['favorite__pointers_pointer'],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['favorite__pointers_pointer'],
        }),
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['favorite__pointers_pointer'],
        }),
      ],
    })
  }

  private async loadData(): Promise<void> {
    this.ribbon.mountChildren(new Loader())
    const response = await fetchFavoriteProducts()
    this.ribbon.clearRibbon()
    if (typeof response === 'string') {
      this.ribbon.mountChildren(new ErrorMessage('Something went wrong. Please, refresh the page'))
    } else {
      this.favouriteCoffee = response.data
      this.ribbon.mountChildren(this.renderCard(this.favouriteCoffee[0]))
    }
  }

  private renderCard(card: Product): HtmlElementComponent<'div'> {
    return new HtmlElementComponent<'div'>({
      tag: 'div',
      classes: ['favorite__slider__card'],
      children: [
        new HtmlElementComponent<'div'>({
          tag: 'div',
          classes: ['favorite__slider__card__image'],
          children: [
            new HtmlElementComponent<'img'>({
              tag: 'img',
              attributes: [
                {
                  name: 'alt',
                  value: `${card.category}`,
                },
                {
                  name: 'src',
                  value: `./images/${card.id}.png`,
                },
              ],
              classes: ['favorite__slider__card__image_img'],
            }),
          ],
        }),
        new HtmlElementComponent<'h4'>({
          tag: 'h4',
          text: `${card.name}`,
          classes: ['favorite__slider__card__title'],
        }),
        new HtmlElementComponent<'p'>({
          tag: 'p',
          text: `${card.description}`,
          classes: ['favorite__slider__card__text'],
        }),
        new HtmlElementComponent<'h4'>({
          tag: 'h4',
          text: `${card.price}`,
          classes: ['favorite__slider__card__title'],
        }),
      ],
    })
  }
}

//function renderCard(step, place) {
//     for (const child of progressBar.children) {
//       child.style.backgroundPosition = 'right'
//     }
//     const drink = allDrinks.find((drink, index) => index === step)
//     const cardHtml = `<div class="favorite__slider__card">
//                 <div class="favorite__slider__card__image">
//                   <img src="assets/images/${step}-${size}.png" alt="coffee" class="favorite__slider__card__image_img" />
//                 </div>
//                 <h4 class="favorite__slider__card__title">${drink.title}</h4>
//                 <p class="favorite__slider__card__text">${drink.text}</p>
//                 <h4 class="favorite__slider__card__title">${drink.price}</h4>
//             </div>`
//     ribbon.insertAdjacentHTML(place, cardHtml)
//
//     progressBar.children[step].style.backgroundPosition = 'left'
//   }
