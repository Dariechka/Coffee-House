import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  type OnDestroy,
  type OnInit,
  Renderer2,
  signal,
} from '@angular/core'
import { IconComponent } from '@/app/shared/icon/icon.component'
import { Router } from '@angular/router'
import { RouterLink } from '@angular/router'
import { closingBurgerMenu } from '@/app/shared/constants/constants'
import type { PriceData } from '@/app/shared/types/types'
import { LocalStorageService } from '@/app/shared/service/local-storage-service/local-storage-service'
import { AddDollarPipePipe } from '@/app/shared/pipe/add-dollar-pipe-pipe'
import type { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink, AddDollarPipePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit, OnDestroy {
  protected localStorageService = inject(LocalStorageService)
  protected isSignIn = signal<boolean>(this.localStorageService.isLoggedIn())
  protected readonly router = inject(Router)
  protected readonly renderer = inject(Renderer2)
  protected isOpen = signal<boolean>(false)
  protected cartData = signal<{ data: PriceData; quantity: number }>(this.localStorageService.getPriceAndNumber())
  private cartSubscription: Subscription | undefined
  protected isLoggedSubscription: Subscription | undefined

  public ngOnInit(): void {
    this.cartSubscription = this.localStorageService.cartData$.subscribe((data) => {
      this.cartData.set(data)
    })
    this.isLoggedSubscription = this.localStorageService.isLoggedData$.subscribe((data) => {
      this.isSignIn.set(data)
    })
  }

  constructor() {
    window.matchMedia('(max-width: 768px)').addEventListener('change', (event) => {
      if (!event.matches && this.isOpen()) {
        this.toggleOpen()
      }
    })
  }

  protected getCurrentPage(): string {
    const url = this.router.url
    if (!url.includes('#')) {
      return url
    } else {
      const index = url.indexOf('#')
      return url.slice(0, index)
    }
  }

  protected toggleOpen(): void {
    this.isOpen.update((val) => !val)
  }

  protected scroll = effect(() => {
    if (this.isOpen()) {
      this.renderer.addClass(document.body, 'no-scroll')
    } else {
      this.renderer.removeClass(document.body, 'no-scroll')
    }
  })

  protected navigateWithDelay(path: string, fragment: string, event: Event): void {
    event.preventDefault()
    this.toggleOpen()

    setTimeout(() => {
      this.router.navigate([path], { fragment })
    }, closingBurgerMenu)
  }

  public ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe()
    this.isLoggedSubscription?.unsubscribe()
  }
}
