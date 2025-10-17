import type { ErrorResponse, Product } from '../typing/types.ts'

export function isErrorResponse(response: object): response is ErrorResponse {
  return !!response['error']
}

export function ifProduct(product: object): product is Product {
  return (
    'id' in product &&
    'name' in product &&
    'price' in product &&
    'description' in product &&
    'category' in product &&
    'discountPrice' in product
  )
}
