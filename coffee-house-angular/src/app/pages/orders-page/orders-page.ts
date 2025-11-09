import { type AfterViewInit, Component, inject, type OnDestroy, type OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ViewportScroller } from '@angular/common'
import type { Subscription } from 'rxjs'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'

@Component({
  selector: 'app-orders-page',
  imports: [],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage implements AfterViewInit, OnInit, OnDestroy {
  protected route = inject(ActivatedRoute)
  protected readonly router = inject(Router)
  protected viewportScroller = inject(ViewportScroller)
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn = signal<boolean>(this.localStorageService.isLoggedIn())
  protected isLoggedSubscription: Subscription | undefined

  public ngOnInit(): void {
    this.isLoggedSubscription = this.localStorageService.isLoggedData$.subscribe((data) => {
      this.isSignIn.set(data)
      if (!this.isSignIn()) {
        this.router.navigate(['cart']).then()
      }
    })
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
