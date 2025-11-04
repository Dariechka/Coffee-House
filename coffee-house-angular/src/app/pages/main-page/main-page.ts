import type { ElementRef } from '@angular/core';
import { type AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [IconComponent, RouterLink],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage implements AfterViewInit {
  @ViewChild('bgVideo') protected bgVideo!: ElementRef<HTMLVideoElement>;
  private route = inject(ActivatedRoute);
  private viewportScroller = inject(ViewportScroller);

  public ngAfterViewInit(): void {
    this.bgVideo.nativeElement.muted = true;
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }
}
