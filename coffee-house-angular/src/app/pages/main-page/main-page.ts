import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [IconComponent, RouterLink],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
