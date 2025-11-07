import { Component, type ElementRef, input, output, ViewChild } from '@angular/core'
import type { AdditiveButtonProps } from '@/app/shared/types/types'

@Component({
  selector: 'app-modal-additive-button',
  imports: [],
  templateUrl: './modal-additive-button.html',
  styleUrl: './modal-additive-button.scss',
})
export class ModalAdditiveButton {
  @ViewChild('additiveButton') public buttonRef!: ElementRef<HTMLButtonElement>
  public additiveData = input.required<AdditiveButtonProps>()
  public emitAdditiveData = output<{ data: AdditiveButtonProps; twice: boolean }>()

  public getAdditivePriceData(): void {
    if (this.buttonRef.nativeElement.classList.contains('active')) {
      this.buttonRef.nativeElement.classList.remove('active')
      this.emitAdditiveData.emit({ data: this.additiveData(), twice: true })
    } else {
      this.buttonRef.nativeElement.classList.add('active')
      this.emitAdditiveData.emit({ data: this.additiveData(), twice: false })
    }
  }
}
