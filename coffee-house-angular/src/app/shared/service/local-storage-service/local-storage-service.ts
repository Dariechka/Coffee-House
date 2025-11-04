import { Injectable } from '@angular/core';
import type { PriceData, StateData, StateItemToCart } from '@/app/shared/types/types';
import { LOCAL_STORAGE_STATE_KEY } from '@/app/shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private stateData: StateData = this.getInitialStateData();

  public getUserToken(): string | null {
    const stateData = this.getStateData();
    return stateData.accessToken;
  }

  public getNumberOfItems(): number {
    const stateData = this.getStateData();
    return stateData.order.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  public getPrice(): PriceData {
    const stateData = this.getStateData();
    return {
      price: stateData.order.totalUnloggedPrice,
      discountPrice: stateData.order.totalPrice,
    };
  }

  public getOrders(): StateItemToCart[] {
    const stateData = this.getStateData();
    return stateData.order.items;
  }

  public isLoggedIn(): boolean {
    const stateData = this.getStateData();
    return stateData.accessToken !== null;
  }

  public clearOrders(): void {
    const stateData = this.getStateData();
    stateData.order.items = [];
    stateData.order.totalPrice = 0;
    stateData.order.totalUnloggedPrice = 0;
    this.stateData = stateData;
    this.saveStateData();
  }

  public removeItemFromCart(item: StateItemToCart): void {
    const stateData = this.getStateData();
    const index = stateData.order.items.indexOf(item);
    stateData.order.items.splice(index, 1);
    stateData.order.totalPrice -= item.price * item.quantity;
    stateData.order.totalUnloggedPrice -= item.unloggedPrice * item.quantity;
    this.stateData = stateData;
    this.saveStateData();
  }

  public addItemToCart(item: StateItemToCart): void {
    const stateData = this.getStateData();
    const equalProduct = stateData.order.items.find(
      (product) =>
        product.productId === item.productId &&
        product.size === item.size &&
        product.additives.length === item.additives.length &&
        product.additives.sort().every((additive, index) => additive === item.additives.sort()[index])
    );
    if (equalProduct) {
      equalProduct.quantity += 1;
    } else {
      stateData.order.items.push(item);
    }
    stateData.order.totalPrice += item.price * item.quantity;
    stateData.order.totalUnloggedPrice += item.unloggedPrice * item.quantity;
    this.stateData = stateData;
    this.saveStateData();
  }

  public login(accessToken: string, id: number): void {
    const stateData = this.getStateData();
    stateData.userId = id;
    stateData.accessToken = accessToken;
    this.saveStateData();
  }

  private getStateData(): StateData {
    return this.stateData;
  }

  private saveStateData(): void {
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(this.stateData));
  }

  private getInitialStateData(): StateData {
    const savedStateData = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    if (savedStateData == null) {
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(this.getDefaultStateData()));
      return this.getDefaultStateData();
    } else {
      return JSON.parse(savedStateData);
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
    };
  }
}
