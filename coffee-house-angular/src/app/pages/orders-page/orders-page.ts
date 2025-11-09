import {
  type AfterViewInit,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
  type ResourceRef,
  signal,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DatePipe, ViewportScroller } from '@angular/common'
import type { Subscription } from 'rxjs'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService } from '@/app/shared/service/api-service/api-service'
import type { OrderHistoryResponse } from '@/app/shared/types/types'
import { ErrorServerMessage } from '@/app/shared/server-error-message/server-error-message'
import { Loader } from '@/app/shared/loader/loader'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'

@Component({
  selector: 'app-orders-page',
  imports: [ErrorServerMessage, Loader, DatePipe, AddDollarPipePipe],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage implements AfterViewInit, OnInit, OnDestroy {
  protected readonly api = inject(ApiService)
  protected route = inject(ActivatedRoute)
  protected readonly router = inject(Router)
  protected viewportScroller = inject(ViewportScroller)
  protected localStorageService = inject(LocalStorageService)
  protected userToken = this.localStorageService.getUserToken()
  protected isSignIn = signal<boolean>(this.localStorageService.isLoggedIn())
  protected isLoggedSubscription: Subscription | undefined
  protected ordersInfo: ResourceRef<OrderHistoryResponse | undefined> | undefined

  public ngOnInit(): void {
    this.isLoggedSubscription = this.localStorageService.isLoggedData$.subscribe((data) => {
      this.isSignIn.set(data)
      if (!this.isSignIn()) {
        this.router.navigate(['cart']).then()
      }
    })
  }

  constructor() {
    if (this.userToken !== null) {
      const token = this.userToken
      this.ordersInfo = rxResource({
        stream: () => this.api.getOrders(token),
      })
    } else {
      this.ordersInfo = undefined
    }
  }

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment)
      }
    })
  }

  public ngOnDestroy(): void {
    this.isLoggedSubscription?.unsubscribe()
  }
}
