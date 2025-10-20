import './slider.scss'
import { HtmlElementComponent } from '../../share/html-element-component.ts'
import { SvgElementComponent } from '../../share/svg-element-component.ts'
import type { Product } from '../../typing/types.ts'
import { fetchFavoriteProducts } from '../../share/api.ts'
import Ribbon from './ribbon/ribbon.ts'
import Loader from '../loader/loader.ts'
import ErrorMessage from '../error-message/error-message.ts'
import {
  calcDelta,
  errorSwipe,
  minTouchValue,
  sliderInterval,
  timerDelayValue,
  transitionTime,
  unmountChildTime,
} from '../../utils/calcDelta.ts'
import Pointer from './ribbon/pointer/pointer.ts'

export default class Slider extends HtmlElementComponent<'div'> {
  private readonly leftButton: HtmlElementComponent<'button'>
  private readonly rightButton: HtmlElementComponent<'button'>
  private readonly ribbon = new Ribbon()
  private readonly pointersList: Array<Pointer>

  private favouriteCoffee: Array<Product> = []
  private touchStartX: number = 0
  private touchEndX: number = 0
  private step: number = 0

  private autoScrollIntervalId: number | undefined

  constructor() {
    super({
      tag: 'div',
      classes: ['favorite__slider-container'],
    })
    this.leftButton = this.creatLeftButton()
    this.rightButton = this.creatRightButton()
    this.pointersList = [new Pointer(), new Pointer(), new Pointer()]

    this.mountChildren(this.createContainer(), this.creatPointersList())

    this.loadData()

    this.element.addEventListener('touchstart', (event) => {
      this.touchStartX = event.changedTouches[0].screenX
    })
    this.element.addEventListener('touchend', (event) => {
      this.touchEndX = event.changedTouches[0].screenX
      this.handleSwipe()
    })
  }

  private creatLeftButton(): HtmlElementComponent<'button'> {
    return new HtmlElementComponent<'button'>({
      tag: 'button',
      classes: ['favorite__slider__button', 'left'],
      listeners: [
        {
          type: 'click',
          value: () => this.leftSliderScroll(),
        },
        {
          type: 'pointerover',
          value: () => clearInterval(this.autoScrollIntervalId),
        },
        {
          type: 'pointerout',
          value: () => (this.autoScrollIntervalId = window.setInterval(() => this.rightSliderScroll(), sliderInterval)),
        },
      ],
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
      listeners: [
        {
          type: 'click',
          value: () => this.rightSliderScroll(),
        },
        {
          type: 'pointerover',
          value: () => clearInterval(this.autoScrollIntervalId),
        },
        {
          type: 'pointerout',
          value: () => (this.autoScrollIntervalId = window.setInterval(() => this.rightSliderScroll(), sliderInterval)),
        },
      ],
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
      children: [...this.pointersList],
    })
  }

  private async loadData(): Promise<void> {
    this.ribbon.mountChildren(new Loader())
    setTimeout(async () => {
      const response = await fetchFavoriteProducts()
      this.ribbon.clearRibbon()
      if (typeof response === 'string') {
        this.ribbon.mountChildren(new ErrorMessage('Something went wrong. Please, refresh the page'))
        this.leftButton.disable()
        this.rightButton.disable()
      } else {
        this.favouriteCoffee = response.data
        this.ribbon.mountChildren(this.createCard(this.favouriteCoffee[this.step]))
        this.autoScrollIntervalId = window.setInterval(() => this.rightSliderScroll(), sliderInterval)
        this.pointersList[this.step].changePosition('left')
      }
    }, timerDelayValue)
  }

  private createCard(card: Product): HtmlElementComponent<'div'> {
    for (const pointer of this.pointersList) {
      pointer.changePosition('right')
    }
    this.pointersList[this.step].changePosition('left')
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
          text: `$${card.price}`,
          classes: ['favorite__slider__card__title'],
        }),
      ],
    })
  }

  private scroll(translation: number, immediate: boolean = false): void {
    if (immediate) {
      this.ribbon.removeClass('ribbon_scroll')
    } else {
      this.ribbon.addClass('ribbon_scroll')
    }
    this.ribbon.translateChildren(translation)
  }
  private leftSliderScroll(): void {
    if (this.step === 0) {
      this.step = this.favouriteCoffee.length - 1
    } else {
      this.step -= 1
    }
    this.ribbon.prependChildren(this.createCard(this.favouriteCoffee[this.step]))
    const translation = calcDelta()
    this.scroll(-translation, true)

    setTimeout(() => this.scroll(0), transitionTime)
    setTimeout(() => this.ribbon.unmountChild(1), unmountChildTime)
  }
  private rightSliderScroll(): void {
    if (this.step === this.favouriteCoffee.length - 1) {
      this.step = 0
    } else {
      this.step += 1
    }
    this.ribbon.mountChildren(this.createCard(this.favouriteCoffee[this.step]))
    const translation = calcDelta()

    setTimeout(() => this.scroll(-translation), transitionTime)
    setTimeout(() => {
      this.ribbon.unmountChild(0)
      this.scroll(0, true)
    }, unmountChildTime)
  }
  private handleSwipe(): void {
    if (calcDelta() === errorSwipe) {
      return
    }
    const diff = this.touchStartX - this.touchEndX
    if (Math.abs(diff) > minTouchValue) {
      if (diff > 0) {
        this.rightSliderScroll()
      } else {
        this.leftSliderScroll()
      }
    }
    this.touchStartX = 0
    this.touchEndX = 0
  }
}
