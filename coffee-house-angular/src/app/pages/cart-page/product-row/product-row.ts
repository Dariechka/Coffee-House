import { Component, inject, input, output } from '@angular/core'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import type { StateItemToCart } from '@/app/shared/types/types'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import { IconComponent } from '@/app/shared/icon/icon.component'

@Component({
  selector: 'app-product-row',
  imports: [AddDollarPipePipe, IconComponent],
  templateUrl: './product-row.html',
  styleUrl: './product-row.scss',
})
export class ProductRow {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn: boolean = this.localStorageService.isLoggedIn()
  public productsInCart = input.required<StateItemToCart>()
  public emitProductData = output<StateItemToCart>()
  public emitChangeProductNumber = output<{ data: StateItemToCart; flag: 'increment' | 'decrement' }>()

  public deleteItem(): void {
    this.emitProductData.emit(this.productsInCart())
  }

  public changeNumber(flag: 'increment' | 'decrement'): void {
    if (flag === 'decrement' && this.productsInCart().quantity === 1) return
    this.emitChangeProductNumber.emit({ data: this.productsInCart(), flag })
  }
}
