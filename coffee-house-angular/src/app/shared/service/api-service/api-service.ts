import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import type { ErrorResponse, ExtendedProductResponse, ProductResponse } from '@/app/shared/types/types'
import {
  type ConfirmOrderResponse,
  type Order,
  type RegistrationRequest,
  type SignInRequest,
  type UserProfileResponse,
  type UserResponse,
} from '@/app/shared/types/types'
import { catchError, type Observable, of } from 'rxjs'
import { baseUrl } from '@/app/shared/constants/constants'
import { isErrorResponse } from '@/app/shared/guards/guards'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);

  public fetchFavoriteProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${baseUrl}products/favorites`).pipe(
      catchError((error) => {
        if (isErrorResponse(error.error)) {
          throw new Error(error.error.error);
        } else {
          throw new Error(error.message);
        }
      })
    )
  }

  public fetchProducts(): Observable<ProductResponse | ErrorResponse> {
    return this.http.get<ProductResponse | ErrorResponse>(`${baseUrl}products`);
  }

  public fetchProduct(id: string): Observable<ExtendedProductResponse | ErrorResponse> {
    return this.http.get<ExtendedProductResponse | ErrorResponse>(`${baseUrl}products/${id}`);
  }

  public userRegistration(data: RegistrationRequest): Observable<UserResponse | string> {
    const headers = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const body = JSON.stringify(data);
    return this.http.post<UserResponse | ErrorResponse>(`${baseUrl}auth/register`, body, headers).pipe(
      catchError((error) => {
        if (isErrorResponse(error.error)) {
          return of(error.error.error);
        } else {
          return of(error.message);
        }
      })
    )
  }

  public userLogin(data: SignInRequest): Observable<UserResponse | string> {
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
    const body = JSON.stringify(data);
    return this.http.post<UserResponse | ErrorResponse>(`${baseUrl}auth/login`, body, { headers }).pipe(
      catchError((error) => {
        if (isErrorResponse(error.error)) {
          return of(error.error.error);
        } else {
          return of(error.message);
        }
      })
    );
  }

  public getUserData(token: string): Observable<UserProfileResponse | ErrorResponse> {
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<UserProfileResponse | ErrorResponse>(`${baseUrl}auth/profile`, { headers });
  }

  public confirmOrder(data: Order): Observable<ConfirmOrderResponse | ErrorResponse> {
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
    const body = JSON.stringify(data);
    return this.http.post<ConfirmOrderResponse | ErrorResponse>(`${baseUrl}orders/confirm`, body, { headers });
  }
}
