import { ChangeDetectionStrategy, Component, effect, inject, Renderer2, signal } from '@angular/core';
import { IconComponent } from '@/app/shared/icon/icon.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly router = inject(Router);
  protected readonly renderer = inject(Renderer2);
  protected isOpen = signal<boolean>(false);

  constructor() {
    window.matchMedia('(max-width: 768px)').addEventListener('change', (event) => {
      if (!event.matches && this.isOpen()) {
        this.toggleOpen();
      }
    });
  }

  protected getCurrentPage(): string {
    const url = this.router.url;
    if (!url.includes('#')) {
      return url;
    } else {
      const index = url.indexOf('#');
      return url.slice(0, index);
    }
  }

  protected toggleOpen(): void {
    this.isOpen.update((val) => !val);
  }

  protected scroll = effect(() => {
    if (this.isOpen()) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  });

  protected navigateWithDelay(path: string, fragment: string, event: Event): void {
    event.preventDefault();
    this.toggleOpen();

    setTimeout(() => {
      this.router.navigate([path], { fragment });
    }, 500);
  }
}
