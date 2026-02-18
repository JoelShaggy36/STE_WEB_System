import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroTransitionComponent } from './shared/components/intro-transition/intro-transition.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IntroTransitionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  protected readonly showIntro = signal(true);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const alreadyShown = sessionStorage.getItem('intro_done') === '1';
      this.showIntro.set(!alreadyShown);
    }
  }

  protected onIntroDone() {
    this.showIntro.set(false);
    if (isPlatformBrowser(this.platformId)) sessionStorage.setItem('intro_done', '1');
  }
}
