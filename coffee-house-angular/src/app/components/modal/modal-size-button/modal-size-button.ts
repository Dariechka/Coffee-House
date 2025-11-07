import { Component, type ElementRef, input, output, ViewChild } from '@angular/core'
import type { SizeButtonProps } from '@/app/shared/types/types'

@Component({
  selector: 'app-modal-size-button',
  imports: [],
  templateUrl: './modal-size-button.html',
  styleUrl: './modal-size-button.scss',
})
export class ModalSizeButton {
  @ViewChild('sizeButton') public buttonRef!: ElementRef<HTMLButtonElement>

  public sizeData = input.required<SizeButtonProps>()
  public activeClass = input<boolean>()
  public emitSizeData = output<SizeButtonProps>()

  public getSizePriceData(): void {
    if (this.buttonRef.nativeElement.classList.contains('active')) {
      return
    }
    this.emitSizeData.emit(this.sizeData())
  }
}
