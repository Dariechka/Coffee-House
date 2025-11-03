import { cities, type City } from '@/app/shared/types/types';

export function isCity(value: string): value is City {
  return cities.includes(value);
}
