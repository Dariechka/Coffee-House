import {
  cities,
  type City,
  type ErrorResponse,
  type ExtendedProduct,
  type UserResponse,
} from '@/app/shared/types/types'

export function isCity(value: string): value is City {
  return cities.includes(value)
}

export function isUserResponse(result: unknown): result is UserResponse {
  return typeof result === 'object' && result !== null && 'data' in result
}

export function isErrorResponse(response: unknown): response is ErrorResponse {
  return typeof response === 'object' && response !== null && 'error' in response
}

export function isExtendedProduct(value: unknown): value is ExtendedProduct {
  if (typeof value !== 'object' || value === null) return false
  if ('additives' in value && 'sizes' in value) {
    const obj = value.sizes
    return Array.isArray(value.additives) && typeof obj === 'object' && obj !== null
  } else {
    return false
  }
}
