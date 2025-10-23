import type { ExtendedProductResponse, ProductResponse, RegistrationRequest, UserResponse } from '../typing/types.ts'
import { isErrorResponse } from '../utils/guards.ts'

const baseUrl = 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com'

async function parse<T>(response: Response): Promise<T | string> {
  if (response.ok) {
    return response.json()
  } else {
    const error = await response.json()
    if (isErrorResponse(error)) {
      return error.error
    }
  }
  return response.statusText
}

export async function fetchFavoriteProducts(): Promise<ProductResponse | string> {
  const url = new URL('/products/favorites', baseUrl)
  const response = await fetch(url)
  return await parse(response)
}

export async function fetchProducts(): Promise<ProductResponse | string> {
  const url = new URL('/products', baseUrl)
  const response = await fetch(url)
  return await parse(response)
}

export async function fetchProduct(id: string): Promise<ExtendedProductResponse | string> {
  const url = new URL(`/products/${id}`, baseUrl)
  const response = await fetch(url)
  return await parse(response)
}

export async function userRegistration(data: RegistrationRequest): Promise<UserResponse | string> {
  const url = new URL('/auth/register', baseUrl)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await parse(response)
}
