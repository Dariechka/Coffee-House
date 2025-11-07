import { Component, input } from '@angular/core'
import type { AdditiveButtonProps } from '@/app/shared/types/types'

@Component({
  selector: 'app-modal-additive-button',
  imports: [],
  templateUrl: './modal-additive-button.html',
  styleUrl: './modal-additive-button.scss',
})
export class ModalAdditiveButton {
  public additiveData = input.required<AdditiveButtonProps>()
}
