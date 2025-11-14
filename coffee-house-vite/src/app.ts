import Router from './router/router.ts'
import { routes } from './router/pages.ts'
import RootElement from './root-element/root-element.ts'

export const router: Router = new Router(routes)
export const root: RootElement = new RootElement()

export const startApp = (): void => root.mountTo(document.body)
