export type Route = {
  path: string
  callback: () => void
}

export default class Router {
  constructor(private routes: Array<Route>) {
    document.addEventListener('click', (event: MouseEvent) => this.interceptNavigation(event))
    window.addEventListener('popstate', () => this.navigate(this.getCurrentUrl()))
    document.addEventListener('DOMContentLoaded', () => this.onBrowserUrlChange())
  }

  public getCurrentUrl(): string {
    //return window.location.hash.replace('#/', '')
    return window.location.pathname.slice(1)
  }

  public navigate(url: string): void {
    this.pushHistory(url)

    const route = this.routes.find((item) => item.path === url || item.path === '*')
    if (!route) {
      throw new Error(`Page for '${url}' was not found`)
    }
    route.callback()
  }

  private onBrowserUrlChange(): void {
    this.navigate(this.getCurrentUrl())
  }

  private pushHistory(url: string): void {
    //window.history.pushState(null, '', `${window.location.pathname}#/${url}`)
    window.history.pushState(null, '', `${window.location.origin}/${url}`)
  }

  private interceptNavigation(event: Event): void {
    const element = event.target
    // console.log('event', event)
    if (!(element instanceof HTMLAnchorElement) || element.origin !== location.origin) {
      return
    }
    // console.log('processing')

    event.preventDefault()
    this.navigate(element.href)
  }
}
