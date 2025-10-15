export type Route = {
  path: string
  callback: () => void
}

export default class Router {
  constructor(private routes: Array<Route>) {
    document.addEventListener('click', (event: MouseEvent) => this.interceptNavigation(event))
    window.addEventListener('popstate', () => this.navigate(this.getCurrentUrl()))
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

  private pushHistory(url: string): void {
    //window.history.pushState(null, '', `${window.location.pathname}#/${url}`)
    window.history.pushState(null, '', `${window.location.pathname}/${url}`)
  }

  private interceptNavigation(event: Event): void {
    const element = event.target
    if (!(element instanceof HTMLAnchorElement) || element.origin !== location.origin) {
      return
    }

    event.preventDefault()
    this.navigate(element.href)
  }
}
