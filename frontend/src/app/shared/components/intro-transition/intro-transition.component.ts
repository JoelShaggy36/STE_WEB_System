import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, PLATFORM_ID, inject } from '@angular/core';

@Component({
  selector: 'app-intro-transition',
  standalone: true,
  templateUrl: './intro-transition.component.html',
  styleUrl: './intro-transition.component.scss'
})
export class IntroTransitionComponent {
  @Output() done = new EventEmitter<void>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const root = this.host.nativeElement as unknown as HTMLElement;
    const overlay = root.querySelector('[data-overlay]') as HTMLElement | null;
    const logo = root.querySelector('[data-logo]') as HTMLElement | null;
    const line = root.querySelector('[data-line]') as HTMLElement | null;
    const machine = root.querySelector('.machine') as HTMLElement | null;
    const gearLarge = root.querySelector('[data-gear-large]') as SVGGElement | null;
    const gearSmall = root.querySelector('[data-gear-small]') as SVGGElement | null;
    const gearTop = root.querySelector('[data-gear-top]') as SVGGElement | null;

    if (!overlay || !logo || !line || !machine || !gearLarge || !gearSmall || !gearTop) {
      this.done.emit();
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: any = await import('animejs');
    // animejs puede exportar default o el objeto directo, según bundler.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const anime = mod?.default ?? mod;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const timeline = anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: overlay,
        opacity: [0, 1],
        duration: 260
      })
      .add(
        {
          targets: machine,
          opacity: [0, 1],
          duration: 380
        },
        '-=120'
      )
      .add(
        {
          targets: logo,
          translateY: [14, 0],
          opacity: [0, 1],
          duration: 520
        },
        '-=120'
      )
      .add(
        {
          targets: line,
          scaleX: [0, 1],
          duration: 900
        },
        '-=280'
      )
      .add(
        {
          targets: gearLarge,
          rotate: [0, 160],
          duration: 7000,
          easing: 'linear'
        },
        '-=820'
      )
      .add(
        {
          targets: gearSmall,
          rotate: [15, -220],
          duration: 7000,
          easing: 'linear'
        },
        '-=7000'
      )
      .add(
        {
          targets: gearTop,
          rotate: [0, 260],
          duration: 7000,
          easing: 'linear'
        },
        '-=7000'
      )
      .add(
        {
          targets: line,
          scaleX: [1, 0.15],
          duration: 350,
          easing: 'easeInQuad'
        },
        '-=900'
      )
      .add({
        targets: logo,
        translateY: [0, -10],
        opacity: [1, 0],
        duration: 420,
        delay: 120
      })
      .add(
        {
          targets: machine,
          opacity: [1, 0],
          duration: 260
        },
        '-=260'
      )
      .add({
        targets: overlay,
        opacity: [1, 0],
        duration: 260,
        complete: () => this.done.emit()
      });

    void timeline;
  }
}
