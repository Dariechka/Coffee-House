import { cities, type City, type CitySelectProps, type ErrorResponse, type StreetSelectProps } from '../typing/types.ts'

export function isErrorResponse(response: unknown): response is ErrorResponse {
  return typeof response === 'object' && response !== null && 'error' in response
}

export function isCity(value: string): value is City {
  return cities.includes(value)
}

export function isCitySelectProps(city: unknown): city is CitySelectProps {
  return typeof city === 'object' && city !== null && 'name' in city && city.name === 'city'
}

export function isStreetSelectProps(street: unknown): street is StreetSelectProps {
  return (
    typeof street === 'object' &&
    street !== null &&
    'name' in street &&
    street.name === 'street' &&
    'nameOfCity' in street &&
    typeof street.nameOfCity === 'string' &&
    isCity(street.nameOfCity)
  )
}
