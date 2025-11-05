import { type ElementRef, signal } from '@angular/core'
import { type AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe, ViewportScroller } from '@angular/common'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService } from '@/app/shared/service/api-service/api-service'
import { Loader } from '@/app/shared/loader/loader'
import { Toggler } from '@/app/shared/server-error-message/server-error-message'
import { at } from '@angular/cli/src/commands/mcp/constants'

@Component({
  selector: 'app-main-page',
  imports: [IconComponent, RouterLink, Loader, JsonPipe, Toggler],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage implements AfterViewInit {
  @ViewChild('bgVideo') protected bgVideo!: ElementRef<HTMLVideoElement>;
  protected readonly api = inject(ApiService);
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

  protected favorites = rxResource({
    stream: () => this.api.fetchFavoriteProducts()
  });
  protected readonly at = at
}




