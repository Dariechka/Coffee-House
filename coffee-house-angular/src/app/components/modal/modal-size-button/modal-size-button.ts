import { Component, input } from '@angular/core'
import type { SizeButtonProps } from '@/app/shared/types/types'

@Component({
  selector: 'app-modal-size-button',
  imports: [],
  templateUrl: './modal-size-button.html',
  styleUrl: './modal-size-button.scss',
})
export class ModalSizeButton {
  public sizeData = input.required<SizeButtonProps>()
  public activeClass = input<boolean>()
}
