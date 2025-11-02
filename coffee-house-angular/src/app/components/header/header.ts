import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
