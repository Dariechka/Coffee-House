import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';

@Component({
  selector: 'app-menu-page',
  imports: [IconComponent],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage {}
