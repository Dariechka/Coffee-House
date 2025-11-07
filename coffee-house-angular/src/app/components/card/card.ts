import { Component, inject, input } from '@angular/core'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import type { Product } from '@/app/shared/types/types'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import { ApiService } from '@/app/shared/service/api-service/api-service'
import { Dialog } from '@angular/cdk/dialog'
import { Modal } from '@/app/components/modal/modal'

@Component({
  selector: 'app-card',
  imports: [AddDollarPipePipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  protected readonly api = inject(ApiService)
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn: boolean = this.localStorageService.isLoggedIn()
  public product = input.required<Product>()

  public dialog = inject(Dialog)

  protected openDialog(): void {
    this.api.fetchProduct(this.product().id).subscribe((result) => {
      if (typeof result === 'string') {
        this.dialog.open<string>(Modal, {
          data: result,
        })
      } else {
        this.dialog.open<string>(Modal, {
          data: result.data,
        })
      }
    })
  }
}
