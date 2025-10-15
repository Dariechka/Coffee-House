import Router, { type Route } from './router.ts'
import MainPage from '../pages /main-page/main-page.ts'
import RegistrationPage from '../pages /registration-page/registration-page.ts'
import SignInPage from '../pages /sign-in-page/sign-in-page.ts'
import MenuPage from '../pages /menu-page/menu-page.ts'
import CartPage from '../pages /cart-page/cart-page.ts'
import NotFoundPage from '../pages /not-found-page/not-found-page.ts'
import { root } from '../root-element/root-element.ts'

export enum Page {
  HOME = '',
  Registration = 'registration',
  SIGN_IN = 'sign-in',
  MAIN = 'main',
  MENU = 'menu',
  CART = 'cart',
  NOT_FOUND = 'not-found',
}

const routes: Array<Route> = [
  {
    path: Page.HOME,
    callback: () => root.setPage(new MainPage()),
  },
  {
    path: Page.MAIN,
    callback: () => root.setPage(new MainPage()),
  },
  {
    path: Page.Registration,
    callback: () => root.setPage(new RegistrationPage()),
  },
  {
    path: Page.SIGN_IN,
    callback: () => root.setPage(new SignInPage()),
  },
  {
    path: Page.MENU,
    callback: () => root.setPage(new MenuPage()),
  },
  {
    path: Page.CART,
    callback: () => root.setPage(new CartPage()),
  },
  {
    path: `*`,
    callback: () => root.setPage(new NotFoundPage()),
  },
]

export const router: Router = new Router(routes)
