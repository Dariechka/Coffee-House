import { HtmlElementComponent } from '../../../../share/html-element-component.ts'
import { cities, type City, type CitySelectProps, streets, type StreetSelectProps } from '../../../../typing/types.ts'
import { isCity, isCitySelectProps, isStreetSelectProps } from '../../../../utils/guards.ts'

export class SelectComponent extends HtmlElementComponent<'div'> {
  private readonly citySelect: HtmlElementComponent<'select'> | undefined
  private streetSelect: HtmlElementComponent<'select'> | undefined
  constructor(private props: CitySelectProps | StreetSelectProps) {
    super({
      tag: 'div',
      children: [
        new HtmlElementComponent<'label'>({
          tag: 'label',
          attributes: [
            {
              name: 'for',
              value: props.name,
            },
          ],
          text: props.name
            .split('')
            .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
            .join(''),
          classes: ['registration__form_label'],
        }),
      ],
      classes: ['registration__form_item'],
    })

    if (isCitySelectProps(this.props)) {
      this.citySelect = this.createCitySelectInput()
      this.mountChildren(this.citySelect)
    } else if (isStreetSelectProps(this.props)) {
      this.streetSelect = this.createStreetSelectInput(this.props.nameOfCity)
      this.mountChildren(this.streetSelect)
    }
  }

  public changeOptions(city: City): void {
    this.unmountChildren()
    this.streetSelect = this.createStreetSelectInput(city)
    this.mountChildren(
      new HtmlElementComponent<'label'>({
        tag: 'label',
        attributes: [
          {
            name: 'for',
            value: this.props.name,
          },
        ],
        text: this.props.name
          .split('')
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join(''),
        classes: ['registration__form_label'],
      }),
      this.streetSelect
    )
  }
  private createCitySelectInput(): HtmlElementComponent<'select'> {
    const citiesHtml: Array<HtmlElementComponent<'option'>> = []
    for (const city of cities) {
      citiesHtml.push(this.createOption(city))
    }
    return new HtmlElementComponent<'select'>({
      tag: 'select',
      children: [
        new HtmlElementComponent<'option'>({
          tag: 'option',
          attributes: [
            {
              name: 'value',
              value: '',
            },
          ],
          text: 'Select city',
        }),
        ...citiesHtml,
      ],
      attributes: [
        {
          name: 'id',
          value: this.props.name,
        },
      ],
      listeners: [
        {
          type: 'change',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLSelectElement) {
              if (isCity(target.value) && isCitySelectProps(this.props)) {
                this.props.CityOnChange(target.value)
                this.citySelect?.addClassToElement('registration__form_input_correct')
              }
            } else {
              throw new Error(`Unexpected type of target ${target}`)
            }
          },
        },
      ],
      classes: ['registration__form_input', 'registration__form_input_small'],
    })
  }
  private createStreetSelectInput(city: City): HtmlElementComponent<'select'> {
    const streetsHtml: Array<HtmlElementComponent<'option'>> = []
    for (const street of streets[city]) {
      streetsHtml.push(this.createOption(street))
    }
    return new HtmlElementComponent<'select'>({
      tag: 'select',
      attributes: [
        {
          name: 'id',
          value: this.props.name,
        },
      ],
      children: [
        new HtmlElementComponent<'option'>({
          tag: 'option',
          attributes: [
            {
              name: 'value',
              value: '',
            },
          ],
          text: 'Select street',
        }),
        ...streetsHtml,
      ],
      listeners: [
        {
          type: 'change',
          value: (event: Event): void => {
            const target = event.target
            if (target instanceof HTMLSelectElement) {
              if (isStreetSelectProps(this.props)) {
                this.props.StreetOnChange(target.value)
                this.streetSelect?.addClassToElement('registration__form_input_correct')
              }
            } else {
              throw new Error(`Unexpected type of target ${target}`)
            }
          },
        },
      ],
      classes: ['registration__form_input', 'registration__form_input_small'],
    })
  }
  private createOption(value: string): HtmlElementComponent<'option'> {
    return new HtmlElementComponent<'option'>({
      tag: 'option',
      attributes: [
        {
          name: 'value',
          value: value,
        },
      ],
      text: value,
    })
  }
}
