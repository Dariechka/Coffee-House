import type { ElementComponent } from '../share/element-component.ts'

export const eventType = {
  fetchProductData: 'fetchProductData',
  openBackground: 'openBackground',
  closeBackground: 'closeBackground',
  addToCart: 'addToCart',
}

export type ElementParameters = {
  classes?: Array<string>
  text?: string
  attributes?: Array<AttributesType>
  listeners?: Array<EventListener>
  children?: Array<ElementComponent<Element>>
}

export type HtmlElementParameters<K extends keyof HTMLElementTagNameMap = 'div'> = {
  tag: K
} & ElementParameters

export type SvgElementParameters<K extends keyof SVGElementTagNameMap> = {
  tag: K
} & ElementParameters

export type AttributesType = {
  name: string
  value: string
}

export type EventListener = {
  type: string
  value: (data: Event) => void
}

export type Type<K extends keyof ElementEventMap> = K
export type Listener<K extends keyof HTMLElementEventMap> = (event_: HTMLElementEventMap[K]) => void

export type Category = 'coffee' | 'tea' | 'dessert'

export type Product = {
  id: number
  name: string
  description: string
  price: string
  discountPrice: string | null
  category: Category
}

export type Size = {
  size: string
  price: string
  discountPrice: string | null
}

export type Additive = {
  name: string
  price: string
  discountPrice: string | null
}

export type ExtendedProduct = Product & {
  sizes: {
    s: Size
    m: Size
    l: Size
    xl: Size
    xxl: Size
  }
  additives: Array<Additive>
}

export type ProductResponse = {
  data: Array<Product>
  message: string
  error: string
}

export type ExtendedProductResponse = {
  data: ExtendedProduct
  message: string
  error: string
}

export type ErrorResponse = {
  error: string
}

export type DFataToCart = {
  id: number
  totalPrise: number
  totalDiscount: number
}

export type PricesHolder = {
  sizePrice: number
  sizeDiscountPrice: number
  additivePrice: number
  additiveDiscountPrice: number
}

export type PriceData = {
  price: number
  discountPrice: number
}
