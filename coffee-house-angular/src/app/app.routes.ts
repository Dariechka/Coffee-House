import type { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    title: 'Main Page',
    loadComponent: () => import('./pages/main-page/main-page').then((m) => m.MainPage),
  },
  {
    path: 'menu',
    title: 'Menu Page',
    loadComponent: () => import('./pages/menu-page/menu-page').then((m) => m.MenuPage),
  },
  {
    path: 'cart',
    title: 'Cart Page',
    loadComponent: () => import('./pages/cart-page/cart-page').then((m) => m.CartPage),
  },
  {
    path: 'sign-in',
    title: 'Sign in Page',
    loadComponent: () => import('./pages/sign-in-page/sign-in-page').then((m) => m.SignInPage),
  },
  {
    path: 'registration',
    title: 'Registration Page',
    loadComponent: () => import('./pages/registration-page/registration-page').then((m) => m.RegistrationPage),
  },
  {
    path: 'orders',
    title: 'Orders Page',
    loadComponent: () => import('./pages/orders-page/orders-page').then((m) => m.OrdersPage),
  },
  {
    path: '**',
    title: 'Not found Page',
    loadComponent: () => import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
]
