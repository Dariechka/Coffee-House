import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error-message.html',
  styleUrl: './server-error-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toggler {
  public readonly message = model.required<string>();
}
