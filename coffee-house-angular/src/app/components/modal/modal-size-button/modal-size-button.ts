import { Component, computed, type ElementRef, input, output, ViewChild } from '@angular/core'
import type { PriceData, SizeButtonProps } from '@/app/shared/types/types'
import { Tooltip } from '@/app/components/tooltip/tooltip'

@Component({
  selector: 'app-modal-size-button',
  imports: [Tooltip],
  templateUrl: './modal-size-button.html',
  styleUrl: './modal-size-button.scss',
})
export class ModalSizeButton {
  @ViewChild('sizeButton') public buttonRef!: ElementRef<HTMLButtonElement>

  public sizeData = input.required<SizeButtonProps>()
  public activeClass = input<boolean>()
  public emitSizeData = output<SizeButtonProps>()

  protected tooltipPriceData = computed(() => {
    const data: PriceData = {
      price: +this.sizeData()?.size.price,
      discountPrice: +(this.sizeData().size.discountPrice ?? 0),
    }
    return data
  })

  public getSizePriceData(): void {
    if (this.buttonRef.nativeElement.classList.contains('active')) {
      return
    }
    this.emitSizeData.emit(this.sizeData())
  }
}
