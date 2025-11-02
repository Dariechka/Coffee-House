import { Component, input, type InputSignal } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  public readonly name: InputSignal<string> = input.required<string>();
  public readonly customClass: InputSignal<string> = input.required<string>();
}
