import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
  signal,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TitleCasePipe, ViewportScroller } from '@angular/common'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import type { PriceData, StateItemToCart } from '@/app/shared/types/types'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService } from '@/app/shared/service/api-service/api-service'
import { ErrorServerMessage } from '@/app/shared/server-error-message/server-error-message'
import { Loader } from '@/app/shared/loader/loader'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import { ProductRow } from '@/app/pages/cart-page/product-row/product-row'
import type { Subscription } from 'rxjs'

@Component({
  selector: 'app-cart-page',
  imports: [ErrorServerMessage, Loader, TitleCasePipe, AddDollarPipePipe, ProductRow],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage implements AfterViewInit, OnInit, OnDestroy {
  protected readonly api = inject(ApiService)
  protected readonly router = inject(Router)
  protected route = inject(ActivatedRoute)
  protected viewportScroller = inject(ViewportScroller)
  protected localStorageService = inject(LocalStorageService)
  protected userToken = this.localStorageService.getUserToken()
  protected userInfo
  private cartSubscription: Subscription | undefined

  protected productsInCart = signal<StateItemToCart[]>(this.localStorageService.getOrders())
  protected totalNumberOfProducts = signal<{ data: PriceData; quantity: number }>(
    this.localStorageService.getPriceAndNumber()
  )

  public ngOnInit(): void {
    this.cartSubscription = this.localStorageService.cartData$.subscribe((data) => {
      this.totalNumberOfProducts.set(data)
    })
  }

  constructor() {
    if (this.userToken !== null) {
      const token = this.userToken
      this.userInfo = rxResource({
        stream: () => this.api.getUserData(token),
      })
    } else {
      this.userInfo = undefined
    }
  }

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment)
      }
    })
  }

  protected navigate(str: string): void {
    this.router.navigate([str]).then()
  }

  protected deleteItem(item: StateItemToCart): void {
    this.localStorageService.removeItemFromCart(item)
    this.productsInCart.set(this.localStorageService.getOrders())
  }

  public ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe()
  }
}
