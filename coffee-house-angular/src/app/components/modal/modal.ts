import { Component, inject } from '@angular/core'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { ErrorServerMessage } from '@/app/shared/server-error-message/server-error-message'
import { isExtendedProduct } from '@/app/shared/guards/guards'
import type { AdditiveButtonProps, PricesHolder, SizeButtonProps, StateItemToCart } from '@/app/shared/types/types'
import { ModalAdditiveButton } from '@/app/components/modal/modal-additive-button/modal-additive-button'
import { ModalSizeButton } from '@/app/components/modal/modal-size-button/modal-size-button'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  imports: [ErrorServerMessage, ModalAdditiveButton, ModalSizeButton],
})
export class Modal {
  public dialogRef = inject<DialogRef<string>>(DialogRef<string>)
  public data: unknown = inject(DIALOG_DATA)
  protected readonly isExtendedProduct = isExtendedProduct

  private price: PricesHolder = {
    sizePrice: 0,
    sizeDiscountPrice: 0,
    additivePrice: 0,
    additiveDiscountPrice: 0,
  }
  private dataToOrder: StateItemToCart = {
    productId: 0,
    productName: '',
    size: 's',
    additives: [],
    quantity: 1,
    price: 0,
    unloggedPrice: 0,
  }
  protected readonly Object = Object

  protected calculateSizeData(): Array<SizeButtonProps> {
    if (isExtendedProduct(this.data)) {
      return Object.entries(this.data.sizes).map((entry) => {
        const size: SizeButtonProps = {
          size: entry[1],
          typeSize: entry[0],
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
}
