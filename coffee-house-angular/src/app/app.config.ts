import type { ApplicationConfig } from '@angular/core'
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { CUSTOM_ERRORS } from '@/app/shared/constants/custom-error.tokens'
import { builtInError } from '@/app/shared/constants/constants'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: CUSTOM_ERRORS,
      useValue: builtInError,
    },
  ],
}
