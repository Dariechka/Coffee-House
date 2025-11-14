import { Component, inject, input, type OnDestroy, type OnInit, signal } from '@angular/core'
import type { PriceData } from '@/app/shared/types/types'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import type { Subscription } from 'rxjs'

@Component({
  selector: 'app-tooltip',
  imports: [AddDollarPipePipe],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip implements OnInit, OnDestroy {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn = signal<boolean>(this.localStorageService.isLoggedIn())
  public priceData = input.required<PriceData>()
  protected isLoggedSubscription: Subscription | undefined

  public ngOnInit(): void {
    this.isLoggedSubscription = this.localStorageService.isLoggedData$.subscribe((data) => {
      this.isSignIn.set(data)
    })
  }

  public ngOnDestroy(): void {
    this.isLoggedSubscription?.unsubscribe()
  }
}
