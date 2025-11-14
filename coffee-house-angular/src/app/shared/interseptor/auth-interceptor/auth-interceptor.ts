import type { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(LocalStorageService)

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${store.getUserToken()}`,
      },
    })
  )
}
