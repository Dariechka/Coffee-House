import { type AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-menu-page',
  imports: [IconComponent],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements AfterViewInit {
  protected route = inject(ActivatedRoute);
  protected viewportScroller = inject(ViewportScroller);

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }
}
