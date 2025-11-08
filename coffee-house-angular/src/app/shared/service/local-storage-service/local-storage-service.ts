import { Injectable } from '@angular/core'
import type { PriceData, StateData, StateItemToCart } from '@/app/shared/types/types'
import { fixed, LOCAL_STORAGE_STATE_KEY } from '@/app/shared/constants/constants'
import { BehaviorSubject, type Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private stateData: StateData = this.getInitialStateData()
  private readonly _cartData = new BehaviorSubject<{ data: PriceData; quantity: number }>(this.getPriceAndNumber())
  private readonly _isLogged = new BehaviorSubject<boolean>(this.isLoggedIn())
  public readonly cartData$: Observable<{ data: PriceData; quantity: number }> = this._cartData.asObservable()
  public readonly isLoggedData$: Observable<boolean> = this._isLogged.asObservable()

  public getUserToken(): string | null {
    const stateData = this.getStateData()
    return stateData.accessToken
  }

  public getPriceAndNumber(): { data: PriceData; quantity: number } {
    const stateData = this.getStateData()
    return {
      data: {
        price: stateData.order.totalUnloggedPrice,
        discountPrice: stateData.order.totalPrice,
      },
      quantity: this.getNumberOfItems(),
    }
  }

  public getOrders(): StateItemToCart[] {
    const stateData = this.getStateData()
    return stateData.order.items
  }

  public isLoggedIn(): boolean {
    const stateData = this.getStateData()
    return stateData.accessToken !== null
  }

  public clearOrders(): void {
    const stateData = this.getStateData()
    stateData.order.items = []
    stateData.order.totalPrice = 0
    stateData.order.totalUnloggedPrice = 0
    this.stateData = stateData
    this.saveStateData()

    this._cartData.next(this.getPriceAndNumber())
  }

  public changeNumberOfItem(prop: { data: StateItemToCart; flag: 'increment' | 'decrement' }): void {
    const stateData = this.getStateData()
    const equalProduct = stateData.order.items.find(
      (product) =>
        product.productId === prop.data.productId &&
        product.size === prop.data.size &&
        product.additives.length === prop.data.additives.length &&
        product.additives.sort().every((additive, index) => additive === prop.data.additives.sort()[index])
    )
    if (!equalProduct) {
      return
    }
    if (prop.flag === 'increment') {
      equalProduct.quantity += 1
      stateData.order.totalPrice = +(stateData.order.totalPrice + prop.data.price).toFixed(fixed)
      stateData.order.totalUnloggedPrice = +(stateData.order.totalUnloggedPrice + prop.data.unloggedPrice).toFixed(
        fixed
      )
    } else if (prop.flag === 'decrement') {
      equalProduct.quantity -= 1
      stateData.order.totalPrice = +(stateData.order.totalPrice - prop.data.price).toFixed(fixed)
      stateData.order.totalUnloggedPrice = +(stateData.order.totalUnloggedPrice - prop.data.unloggedPrice).toFixed(
        fixed
      )
    }

    this.stateData = stateData
    this.saveStateData()
    this._cartData.next(this.getPriceAndNumber())
  }

  public removeItemFromCart(item: StateItemToCart): void {
    const stateData = this.getStateData()
    const index = stateData.order.items.indexOf(item)
    stateData.order.items.splice(index, 1)
    stateData.order.totalPrice = +(stateData.order.totalPrice - item.price * item.quantity).toFixed(fixed)
    stateData.order.totalUnloggedPrice = +(
      stateData.order.totalUnloggedPrice -
      item.unloggedPrice * item.quantity
    ).toFixed(fixed)
    this.stateData = stateData
    this.saveStateData()

    this._cartData.next(this.getPriceAndNumber())
  }

  public addItemToCart(item: StateItemToCart): void {
    const stateData = this.getStateData()
    const equalProduct = stateData.order.items.find(
      (product) =>
        product.productId === item.productId &&
        product.size === item.size &&
        product.additives.length === item.additives.length &&
        product.additives.sort().every((additive, index) => additive === item.additives.sort()[index])
    )
    if (equalProduct) {
      equalProduct.quantity += 1
    } else {
      stateData.order.items.push(item)
    }
    stateData.order.totalPrice = +(stateData.order.totalPrice + item.price * item.quantity).toFixed(fixed)
    stateData.order.totalUnloggedPrice = +(
      stateData.order.totalUnloggedPrice +
      item.unloggedPrice * item.quantity
    ).toFixed(fixed)
    this.stateData = stateData
    this.saveStateData()

    this._cartData.next(this.getPriceAndNumber())
  }

  public login(accessToken: string, id: number): void {
    const stateData = this.getStateData()
    stateData.userId = id
    stateData.accessToken = accessToken
    this.saveStateData()

    this._isLogged.next(true)
  }

  private getNumberOfItems(): number {
    const stateData = this.getStateData()
    return stateData.order.items.reduce((acc, item) => acc + item.quantity, 0)
  }

  private getStateData(): StateData {
    return this.stateData
  }

  private saveStateData(): void {
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(this.stateData))
  }

  private getInitialStateData(): StateData {
    const savedStateData = localStorage.getItem(LOCAL_STORAGE_STATE_KEY)
    if (savedStateData == null) {
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(this.getDefaultStateData()))
      return this.getDefaultStateData()
    } else {
      return JSON.parse(savedStateData)
    }
  }

  private getDefaultStateData(): StateData {
    return {
      accessToken: null,
      userId: null,
      order: {
        items: [],
        totalPrice: 0,
        totalUnloggedPrice: 0,
      },
    }
  }
}
