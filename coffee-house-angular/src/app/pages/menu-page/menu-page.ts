import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  type ResourceRef,
  signal,
} from '@angular/core'
import { IconComponent } from '@/app/shared/icon/icon.component'
import { ActivatedRoute } from '@angular/router'
import { TitleCasePipe, ViewportScroller } from '@angular/common'
import { rxResource } from '@angular/core/rxjs-interop'
import { ApiService } from '@/app/shared/service/api-service/api-service'
import type { ProductResponse } from '@/app/shared/types/types'
import { Loader } from '@/app/shared/loader/loader'
import { ErrorServerMessage } from '@/app/shared/server-error-message/server-error-message'
import { Card } from '@/app/components/card/card'
import { borderWindowWidth, numberOfCards } from '@/app/shared/constants/constants'

@Component({
  selector: 'app-menu-page',
  imports: [IconComponent, Loader, ErrorServerMessage, TitleCasePipe, Card],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements AfterViewInit {
  protected readonly api = inject(ApiService)
  protected route = inject(ActivatedRoute)
  protected viewportScroller = inject(ViewportScroller)
  protected categories: Array<string> = ['coffee', 'tea', 'dessert']
  protected selectedCategory = signal<string>('coffee')
  protected viewportWidth = signal<number>(window.innerWidth)
  protected loadButtonAvailable = signal<boolean>(false)
  protected allCategories: ResourceRef<ProductResponse | undefined>

  constructor() {
    this.allCategories = rxResource({
      stream: () => this.api.fetchProducts(),
    })

    window.addEventListener('resize', () => {
      this.viewportWidth.set(window.innerWidth)
      this.loadButtonAvailable.set(false)
    })
  }

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment)
      }
    })
  }

  protected filteredProducts = computed(() => {
    const products = this.allCategories.value()?.data ?? []
    const category = this.selectedCategory()

    if (!this.categories.includes(category)) {
      return
    }

    if (this.loadButtonAvailable()) {
      return products.filter((p) => p.category === category)
    }

    return this.viewportWidth() > borderWindowWidth
      ? products.filter((p) => p.category === category)
      : products.filter((p) => p.category === category).slice(0, numberOfCards)
  })

  protected handleCategoryButtonClick(category: string): void {
    this.selectedCategory.set(category)
    this.loadButtonAvailable.set(false)
  }
}
