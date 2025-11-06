import { cities, type City, type ErrorResponse, type UserResponse } from '@/app/shared/types/types'

export function isCity(value: string): value is City {
  return cities.includes(value)
}

export function isUserResponse(result: unknown): result is UserResponse {
  return typeof result === 'object' && result !== null && 'data' in result
}

export function isErrorResponse(response: unknown): response is ErrorResponse {
  return typeof response === 'object' && response !== null && 'error' in response
}
