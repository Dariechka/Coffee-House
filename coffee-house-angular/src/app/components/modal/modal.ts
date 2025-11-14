import { Component, computed, inject, type OnDestroy, type OnInit, signal, type Signal } from '@angular/core'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { ErrorServerMessage } from '@/app/shared/server-error-message/server-error-message'
import { isExtendedProduct } from '@/app/shared/guards/guards'
import type { AdditiveButtonProps, PricesHolder, SizeButtonProps, StateItemToCart } from '@/app/shared/types/types'
import { ModalAdditiveButton } from '@/app/components/modal/modal-additive-button/modal-additive-button'
import { ModalSizeButton } from '@/app/components/modal/modal-size-button/modal-size-button'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import { decimals } from '@/app/shared/constants/constants'
import type { Subscription } from 'rxjs'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  imports: [ErrorServerMessage, ModalAdditiveButton, ModalSizeButton, AddDollarPipePipe],
})
export class Modal implements OnInit, OnDestroy {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn = signal<boolean>(this.localStorageService.isLoggedIn())
  public dialogRef = inject<DialogRef<string>>(DialogRef<string>)
  public data: unknown = inject(DIALOG_DATA)
  protected readonly isExtendedProduct = isExtendedProduct
  protected isLoggedSubscription: Subscription | undefined

  public price = signal<PricesHolder>({
    sizePrice: 0,
    sizeDiscountPrice: 0,
    additivePrice: 0,
    additiveDiscountPrice: 0,
  })

  public totalPrice: Signal<{ price: number; discountPrice: number }> = computed(() => {
    return {
      price: this.price().sizePrice + this.price().additivePrice,
      discountPrice: this.price().sizeDiscountPrice + this.price().additiveDiscountPrice,
    }
  })

  protected dataToOrder = signal<StateItemToCart>({
    productId: 0,
    productName: '',
    size: 's',
    additives: [],
    quantity: 1,
    price: 0,
    unloggedPrice: 0,
  })
  protected readonly Object = Object

  protected buttonSizes: Array<SizeButtonProps> = []

  public ngOnInit(): void {
    this.buttonSizes = this.calculateSizeData()
    this.dataToOrder.update((value) => ({
      ...value,
      productId: isExtendedProduct(this.data) ? this.data.id : 0,
      productName: isExtendedProduct(this.data) ? this.data.name : '',
      price: this.totalPrice().discountPrice,
      unloggedPrice: this.totalPrice().price,
    }))
    this.isLoggedSubscription = this.localStorageService.isLoggedData$.subscribe((data) => {
      this.isSignIn.set(data)
    })
  }

  protected addToCart(): void {
    this.localStorageService.addItemToCart(this.dataToOrder())
    this.dialogRef.close()
  }

  protected calculateSizeData(): Array<SizeButtonProps> {
    if (isExtendedProduct(this.data)) {
      return Object.entries(this.data.sizes).map((entry, index) => {
        const size: SizeButtonProps = {
          size: entry[1],
          typeSize: entry[0],
        }
        if (index === 0) {
          this.price.update((value) => ({
            ...value,
            sizePrice: value.sizePrice + +entry[1].price,
            sizeDiscountPrice: value.sizeDiscountPrice + +(entry[1].discountPrice ?? entry[1].price),
          }))
        }
        return size
      })
    } else {
      return []
    }
  }
  protected calculateAdditiveData(): Array<AdditiveButtonProps> {
    if (isExtendedProduct(this.data)) {
      return this.data.additives.map((additive, index) => {
        const add: AdditiveButtonProps = {
          additive: additive,
          index: index + 1,
        }
        return add
      })
    } else {
      return []
    }
  }

  protected updateSizePrice(data: SizeButtonProps): void {
    this.price.update((value) => ({
      ...value,
      sizePrice: +data.size.price,
      sizeDiscountPrice: +(data.size.discountPrice ?? data.size.price),
    }))
    this.dataToOrder.update((value) => ({
      ...value,
      size: data.typeSize,
      price: this.price().sizeDiscountPrice + this.price().additiveDiscountPrice,
      unloggedPrice: this.price().sizePrice + this.price().additivePrice,
    }))
  }
  protected updateAdditivePrice(data: { data: AdditiveButtonProps; twice: boolean }): void {
    if (data.twice) {
      const copy = this.dataToOrder().additives
      copy.splice(this.dataToOrder().additives.indexOf(data.data.additive.name), 1)
      this.dataToOrder.update((value) => ({
        ...value,
        additives: copy,
      }))
      if (data.data.additive.discountPrice != null && data.data.additive.discountPrice > 0) {
        this.price.update((value) => ({
          ...value,
          additivePrice: +this.ceilToDecimals(value.additivePrice - +data.data.additive.price),
          additiveDiscountPrice: +this.ceilToDecimals(
            value.additiveDiscountPrice - +(data.data.additive.discountPrice ?? 0)
          ),
        }))
        this.updateCartToOrderPrice()
      } else {
        this.price.update((value) => ({
          ...value,
          additivePrice: +this.ceilToDecimals(value.additivePrice - data.data.additive.price),
          additiveDiscountPrice: +this.ceilToDecimals(value.additiveDiscountPrice - data.data.additive.price),
        }))
        this.updateCartToOrderPrice()
      }
    } else {
      this.dataToOrder().additives.push(data.data.additive.name)
      if (data.data.additive.discountPrice != null && data.data.additive.discountPrice > 0) {
        this.price.update((value) => ({
          ...value,
          additivePrice: +this.ceilToDecimals(value.additivePrice + +data.data.additive.price),
          additiveDiscountPrice: +this.ceilToDecimals(
            value.additiveDiscountPrice + +(data.data.additive.discountPrice ?? 0)
          ),
        }))
        this.updateCartToOrderPrice()
      } else {
        this.price.update((value) => ({
          ...value,
          additivePrice: +this.ceilToDecimals(value.additivePrice + +data.data.additive.price),
          additiveDiscountPrice: +this.ceilToDecimals(value.additiveDiscountPrice + +data.data.additive.price),
        }))
        this.updateCartToOrderPrice()
      }
    }
  }

  private ceilToDecimals(number_: number): number {
    return Math.ceil(number_ * decimals) / decimals
  }

  private updateCartToOrderPrice(): void {
    this.dataToOrder.update((value) => ({
      ...value,
      price: this.price().sizeDiscountPrice + this.price().additiveDiscountPrice,
      unloggedPrice: this.price().sizePrice + this.price().additivePrice,
    }))
  }

  public ngOnDestroy(): void {
    this.isLoggedSubscription?.unsubscribe()
  }
}
