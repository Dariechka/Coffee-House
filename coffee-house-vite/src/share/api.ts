import type {
  ConfirmOrderResponse,
  ExtendedProductResponse,
  Order,
  ProductResponse,
  RegistrationRequest,
  SignInRequest,
  UserProfileResponse,
  UserResponse,
} from '../typing/types.ts'
import { isErrorResponse } from '../utils/guards.ts'

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
  const url = new URL('/products/favorites', 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/')
  const response = await fetch(url)
  return await parse(response)
}

export async function fetchProducts(): Promise<ProductResponse | string> {
  const url = new URL('/products', 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/')
  const response = await fetch(url)
  return await parse(response)
}

export async function fetchProduct(id: string): Promise<ExtendedProductResponse | string> {
  const url = new URL(`/products/${id}`, 'http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/')
  const response = await fetch(url)
  return await parse(response)
}

export async function userRegistration(data: RegistrationRequest): Promise<UserResponse | string> {
  const url = new URL('/auth/register', document.location.origin)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await parse(response)
}
export async function userLogin(data: SignInRequest): Promise<UserResponse | string> {
  const url = new URL('/auth/login', document.location.origin)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await parse(response)
}

export async function getUserData(token: string): Promise<UserProfileResponse | string> {
  const url = new URL(`/auth/profile`, document.location.origin)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return await parse(response)
}

export async function confirmOrder(data: Order): Promise<ConfirmOrderResponse | string> {
  const url = new URL('/orders/confirm', document.location.origin)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await parse(response)
}
