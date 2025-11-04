import { isMoreBorderWindowWidth, unmountChildTime } from '../utils/calcDelta.ts'

export type Route = {
  path: string
  callback: () => void
}

export default class Router {
  private appliedRoute: Route | null = null

  constructor(private routes: Array<Route>) {
    document.addEventListener('click', (event: MouseEvent) => this.interceptNavigation(event))
    window.addEventListener('popstate', () => this.navigate(this.getCurrentPathname(), this.getCurrentHash(), false))
    document.addEventListener('DOMContentLoaded', () => this.onBrowserUrlChange())
  }

  public navigate(pathname: string, hash: string = '', pushHistory: boolean = true): void {
    if (pushHistory) {
      this.pushHistory(pathname + hash)
    }

    const route = this.routes.find((item) => item.path === pathname || item.path === '*')
    if (!route) {
      throw new Error(`Page for '${pathname}' was not found`)
    }
    if (this.appliedRoute !== route) {
      route.callback()
      this.appliedRoute = route
    }

    if (hash) {
      this.scrollToHash(hash)
      // setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    }
  }

  private getCurrentPathname(): string {
    return window.location.pathname.slice(1)
  }

  private getCurrentHash(): string {
    return window.location.hash
  }

  private scrollToHash(hash: string): void {
    setTimeout(() => {
      if (document.readyState === 'complete') {
        document.getElementById(hash.slice(1))?.scrollIntoView()
      } else {
        this.scrollToHash(hash)
      }
    })
  }

  private pushHistory(url: string): void {
    //window.history.pushState(null, '', `${window.location.pathname}#/${url}`)
    window.history.pushState(null, '', `${window.location.origin}/${url}`)
  }

  private onBrowserUrlChange(): void {
    this.navigate(this.getCurrentPathname())
  }

  private interceptNavigation(event: Event): void {
    const target = event.target
    if (target instanceof Element) {
      const link = target.closest('a')
      if (!link || link.origin !== location.origin) {
        return
      }

      event.preventDefault()
      if (isMoreBorderWindowWidth()) {
        this.navigate(link.pathname.slice(1), link.hash)
      } else {
        setTimeout(() => {
          this.navigate(link.pathname.slice(1), link.hash)
        }, unmountChildTime)
      }
    }
  }
}
