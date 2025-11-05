import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiService } from '@/app/shared/service/api-service/api-service';
import { Loader } from '@/app/shared/loader/loader';
import { Toggler } from '@/app/shared/server-error-message/server-error-message';
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe';

@Component({
  selector: 'app-main-page',
  imports: [IconComponent, RouterLink, Loader, Toggler, AddDollarPipePipe],
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
    stream: () => this.api.fetchFavoriteProducts(),
  });
}
