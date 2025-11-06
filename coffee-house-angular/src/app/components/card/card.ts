import { Component, inject, input } from '@angular/core'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import type { Product } from '@/app/shared/types/types'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'

@Component({
  selector: 'app-card',
  imports: [AddDollarPipePipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn: boolean = this.localStorageService.isLoggedIn()
  public product = input.required<Product>()
}
