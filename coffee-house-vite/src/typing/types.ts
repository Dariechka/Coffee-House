import type { ElementComponent } from '../share/element-component.ts'

export const eventType = {
  fetchProductData: 'fetchProductData',
  openBackground: 'openBackground',
  closeBackground: 'closeBackground',
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
  price: number
  discountPrice: number | null
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

export type UserResponse = {
  data: {
    access_token: string
    user: {
      login: string
      city: string
      street: string
      houseNumber: string
      paymentMethod: string
      id: number
      createdAt: string
    }
  }
  message: string
  error: string
}

export type ErrorResponse = {
  error: string
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

export type InputProps = {
  onUpdate: (value: string) => undefined | string
  addClassToParent: (name: string, flag: boolean, text?: string) => void
  classes: Array<string>
  name: string
  type: string
  min?: string
}

export type InputComponentProps = Omit<InputProps, 'addClassToParent'>

export type RegistrationRequest = {
  login: string
  password: string
  confirmPassword: string
  city: string
  street: string
  houseNumber: number
  paymentMethod: 'card' | 'cash'
}

export type SignInRequest = Pick<RegistrationRequest, 'login' | 'password'>

export type City = 'New York' | 'San Francisco' | 'Chicago'
export const cities = ['New York', 'San Francisco', 'Chicago']

export type Street = Record<City, Array<string>>
export const streets: Street = {
  'New York': [
    'Broadway',
    'Fifth Avenue',
    'Madison Avenue',
    'Wall Street',
    'Park Avenue',
    'Lexington Avenue',
    'Canal Street',
    'Bowery',
    'Houston Street',
    '42nd Street',
  ],
  'San Francisco': [
    'Lombard Street',
    'Market Street',
    'Mission Street',
    'Haight Street',
    'Castro Street',
    'Van Ness Avenue',
    'Divisadero Street',
    'Geary Boulevard',
    'Embarcadero',
    'Folsom Street',
  ],
  Chicago: [
    'Michigan Avenue',
    'State Street',
    'Lake Shore Drive',
    'Wacker Drive',
    'Clark Street',
    'LaSalle Street',
    'Halsted Street',
    'Roosevelt Road',
    'Division Street',
    'Ashland Avenue',
  ],
}

export type CitySelectProps = {
  name: 'city'
  CityOnChange: (city: City) => void
}

export type StreetSelectProps = {
  name: 'street'
  nameOfCity: City
  StreetOnChange: (street: string) => void
}

export type StateItemToCart = {
  productId: number
  size: string
  additives: Array<string>
  quantity: number
  price: number
  unloggedPrice: number
}

export type StateOrder = {
  items: Array<StateItemToCart>
  totalPrice: number
  totalUnloggedPrice: number
}

export type StateData = {
  accessToken: string | null
  userId: number | null
  order: StateOrder
}
