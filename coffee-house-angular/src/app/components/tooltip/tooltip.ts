import { Component, inject, input } from '@angular/core'
import type { PriceData } from '@/app/shared/types/types'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'

@Component({
  selector: 'app-tooltip',
  imports: [AddDollarPipePipe],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn: boolean = this.localStorageService.isLoggedIn()
  public priceData = input.required<PriceData>()
}
