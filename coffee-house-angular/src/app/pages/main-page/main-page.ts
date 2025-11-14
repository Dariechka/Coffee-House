import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  inject,
  ViewChild,
} from '@angular/core'
import { IconComponent } from '@/app/shared/icon/icon.component'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { ViewportScroller } from '@angular/common'
import { Slider } from '@/app/components/slider/slider'

@Component({
  selector: 'app-main-page',
  imports: [IconComponent, RouterLink, Slider],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage implements AfterViewInit {
  @ViewChild('bgVideo') protected bgVideo!: ElementRef<HTMLVideoElement>
  private route = inject(ActivatedRoute)
  private viewportScroller = inject(ViewportScroller)

  public ngAfterViewInit(): void {
    this.bgVideo.nativeElement.muted = true
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment)
      }
    })
  }
}
