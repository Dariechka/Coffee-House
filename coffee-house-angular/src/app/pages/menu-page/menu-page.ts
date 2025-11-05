import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  type ResourceRef,
  signal,
} from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe, ViewportScroller } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiService } from '@/app/shared/service/api-service/api-service';
import type { ProductResponse } from '@/app/shared/types/types';
import { Loader } from '@/app/shared/loader/loader';
import { Toggler } from '@/app/shared/server-error-message/server-error-message';
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service';
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe';

@Component({
  selector: 'app-menu-page',
  imports: [IconComponent, Loader, Toggler, TitleCasePipe, AddDollarPipePipe],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage implements AfterViewInit {
  protected readonly api = inject(ApiService);
  protected localStorageService = inject(LocalStorageService);
  protected route = inject(ActivatedRoute);
  protected viewportScroller = inject(ViewportScroller);
  protected categories: Array<string> = ['coffee', 'tea', 'dessert'];
  protected allCategories: ResourceRef<ProductResponse | undefined>;
  protected selectedCategory = signal<string>('coffee');
  protected isSignIn: boolean = this.localStorageService.isLoggedIn();

  constructor() {
    this.allCategories = rxResource({
      stream: () => this.api.fetchProducts(),
    });
  }

  public ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment !== null) {
        this.viewportScroller.scrollToAnchor(fragment);
      }
    });
  }

  protected filteredProducts = computed(() => {
    const products = this.allCategories.value()?.data ?? [];
    const category = this.selectedCategory();

    if (!this.categories.includes(category)) {
      return;
    }

    return products.filter((p) => p.category === category);
  });
}
