import { type AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage implements AfterViewInit {
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
