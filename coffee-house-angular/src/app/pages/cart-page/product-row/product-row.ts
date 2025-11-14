import { Component, inject, input, type OnDestroy, type OnInit, output, signal } from '@angular/core'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import type { StateItemToCart } from '@/app/shared/types/types'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import { IconComponent } from '@/app/shared/icon/icon.component'
import type { Subscription } from 'rxjs'

@Component({
  selector: 'app-product-row',
  imports: [AddDollarPipePipe, IconComponent],
  templateUrl: './product-row.html',
  styleUrl: './product-row.scss',
})
export class ProductRow implements OnInit, OnDestroy {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn = signal<boolean>(this.localStorageService.isLoggedIn())
  public productsInCart = input.required<StateItemToCart>()
  public emitProductData = output<StateItemToCart>()
  public emitChangeProductNumber = output<{ data: StateItemToCart; flag: 'increment' | 'decrement' }>()
  protected isLoggedSubscription: Subscription | undefined

  public ngOnInit(): void {
    this.isLoggedSubscription = this.localStorageService.isLoggedData$.subscribe((data) => {
      this.isSignIn.set(data)
    })
  }

  public deleteItem(): void {
    this.emitProductData.emit(this.productsInCart())
  }

  public changeNumber(flag: 'increment' | 'decrement'): void {
    if (flag === 'decrement' && this.productsInCart().quantity === 1) return
    this.emitChangeProductNumber.emit({ data: this.productsInCart(), flag })
  }

  public ngOnDestroy(): void {
    this.isLoggedSubscription?.unsubscribe()
  }
}
