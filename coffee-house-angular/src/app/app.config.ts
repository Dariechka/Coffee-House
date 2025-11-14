import type { ApplicationConfig } from '@angular/core'
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { CUSTOM_ERRORS } from '@/app/shared/constants/custom-error.tokens'
import { builtInError } from '@/app/shared/constants/constants'
import { authInterceptor } from '@/app/shared/interseptor/auth-interceptor/auth-interceptor'
import { contentTypeInterceptor } from '@/app/shared/interseptor/content-type-interseptors/content-type-interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, contentTypeInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: CUSTOM_ERRORS,
      useValue: builtInError,
    },
  ],
}
