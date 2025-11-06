import { Component, computed, inject, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService } from '@/app/shared/service/api-service/api-service'
import { IconComponent } from '@/app/shared/icon/icon.component'
import { Loader } from '@/app/shared/loader/loader'
import { Toggler } from '@/app/shared/server-error-message/server-error-message'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'

@Component({
  selector: 'app-slider',
  imports: [IconComponent, Loader, Toggler, AddDollarPipePipe],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider {
  protected readonly api = inject(ApiService)

  protected favorites = rxResource({
    stream: () => this.api.fetchFavoriteProducts(),
  })

  protected translationPx = signal(-this.calcDelta())
  protected immediateTranslation = signal(false)
  protected transitionInProgress = signal<null | 'left' | 'right'>(null)

  protected currentIndex = signal(0)
  protected currentTriad = computed(() => {
    const currentIndex = this.currentIndex()
    const products = this.favorites.value()?.data ?? []
    const first = currentIndex - 1 < 0 ? products.length - 1 : currentIndex - 1
    const second = currentIndex
    const third = currentIndex + 1 > products.length - 1 ? 0 : currentIndex + 1
    return [products[first], products[second], products[third]]
  })

  protected slide(direction: 'left' | 'right'): void {
    if (this.transitionInProgress()) {
      return
    }

    this.immediateTranslation.set(false)
    switch (direction) {
      case 'left': {
        this.translationPx.set(0)
        this.transitionInProgress.set(direction)
        return
      }
      case 'right': {
        const translation = this.calcDelta()
        this.translationPx.set(-translation * 2)
        this.transitionInProgress.set(direction)
        return
      }
    }
  }

  protected transitioned(): void {
    const currentIndex = this.currentIndex()
    const totalLength = (this.favorites.value()?.data ?? []).length
    switch (this.transitionInProgress()) {
      case 'left': {
        this.currentIndex.set(currentIndex > 0 ? currentIndex - 1 : totalLength - 1)
        break
      }
      case 'right': {
        this.currentIndex.set(currentIndex < totalLength - 1 ? currentIndex + 1 : 0)
        break
      }
    }
    this.immediateTranslation.set(true)
    this.translationPx.set(-this.calcDelta())
    this.transitionInProgress.set(null)
  }

  protected calcDelta(): number {
    const largeRibbonWidth: number = 480
    const smallRibbonWidth: number = 348
    const borderWindowWidth: number = 768
    return window.innerWidth > borderWindowWidth ? largeRibbonWidth : smallRibbonWidth
  }
}
