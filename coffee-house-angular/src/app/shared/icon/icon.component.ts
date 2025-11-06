import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core'

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  public readonly name: InputSignal<string> = input.required<string>()
  public readonly customClass: InputSignal<string> = input.required<string>()
}
