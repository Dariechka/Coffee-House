import type { HttpInterceptorFn } from '@angular/common/http'

export const contentTypeInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
  )
}
