import { HtmlElementComponent } from '../../../share/html-element-component.ts'

export default class CategoryButton extends HtmlElementComponent<'button'> {
  constructor(public category: string) {
    super({
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
                  value: `${category}`,
                },
                {
                  name: 'src',
                  value: `./images/${category}.png`,
                },
              ],
            }),
          ],
        }),
        new HtmlElementComponent<'span'>({
          tag: 'span',
          text: `${category
            .split('')
            .map((item, index) => (index === 0 ? item.toUpperCase() : item))
            .join('')}`,
          classes: ['menu__button_text'],
        }),
      ],
    })
  }

  public isCategoriesTheSame(text: string): boolean {
    return text === this.category
  }

  public addClassToButton(name: string): void {
    this.element.classList.add(name)
  }

  public removeClassFromButton(name: string): void {
    this.element.classList.remove(name)
  }

  public getTextContent(): string {
    return this.element.textContent
      .trim()
      .split('')
      .map((letter, index) => (index === 0 ? letter.toLowerCase() : letter))
      .join('')
  }
}
