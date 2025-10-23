import type { StateItemToCart, StateData } from '../typing/types.ts'

const LOCAL_STORAGE_STATE_KEY = 'SHORT_TRACK_LOCAL_STORAGE_STATE_DATA_KEY'

export class State {
  private stateData: StateData = this.getInitialStateData()

  public addItemToCart(item: StateItemToCart, totalPrice: number, discountPrice: number): void {
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
    alert(stateData.order.totalUnloggedPrice)
    stateData.order.totalPrice += discountPrice
    stateData.order.totalUnloggedPrice += totalPrice
    this.saveStateData()
  }

  public login(accessToken: string, id: number): void {
    const stateData = this.getStateData()
    stateData.userId = id
    stateData.accessToken = accessToken
    this.saveStateData()
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

export const state: State = new State()
