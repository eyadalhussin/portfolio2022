
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { sidebarService } from '../Services/sidebarService';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-portfolio-sidebar',
  templateUrl: './portfolio-sidebar.component.html',
  styleUrls: ['./portfolio-sidebar.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
      ])
    ]),
    trigger('slideOut', [
      state('shown', style({
        transform: 'translateX(0%)'
      })),
      state('hidden', style({
        transform: 'translateX(100%)'
      })),
      transition('shown <=> hidden', animate(300))
    ])
  ]
})
export class PortfolioSidebarComponent implements OnInit, AfterViewChecked {
  leaveState: string = 'shown';

  constructor(private sidebarService: sidebarService, private stateService: stateService, private elementRef: ElementRef) {
  }

  ngAfterViewChecked(): void {
    let cont = document.querySelector('#sidebarContainer') as HTMLElement;
    cont.focus();
  }

  ngOnInit(): void {

    this.initColors();
  }

  closeSidebar() {
    this.leaveState = 'hidden';
    setTimeout(() => {
      this.sidebarService.closeSidebar();
    }, 500);
  }

  navigate(nav: String) {
    switch (nav) {
      case 'home':
        if (this.stateService.currentSubject == 1) {
          this.stateService.navDown();
        } else if (this.stateService.currentSubject == 2) {
          this.stateService.navDown();
          setTimeout(() => {
            this.stateService.navDown();
          }, 500);
        }
        this.elementRef.nativeElement.style.setProperty('--sidebar-primary', '#323232');
        this.elementRef.nativeElement.style.setProperty('--sidebar-secondary', 'white');
        break;
      case 'projects':
        if (this.stateService.currentSubject == 0) {
          this.stateService.navUp();
        } else if (this.stateService.currentSubject == 2) {
          this.stateService.navDown();
        }
        this.elementRef.nativeElement.style.setProperty('--sidebar-primary', 'white');
        this.elementRef.nativeElement.style.setProperty('--sidebar-secondary', '#323232');
        break;
      case 'contact':
        if (this.stateService.currentSubject == 0) {
          this.stateService.navUp();
          setTimeout(() => {
            this.stateService.navUp();
          }, 500);
        } else if (this.stateService.currentSubject == 1) {
          this.stateService.navUp();
        }
        this.elementRef.nativeElement.style.setProperty('--sidebar-primary', '#323232');
        this.elementRef.nativeElement.style.setProperty('--sidebar-secondary', 'white');
        break;
    }
  }

  initColors() {
    let primray;
    let secondary;
    this.stateService.currentSubject == 1 ? primray = '#ffffff' : primray = '#323232';
    this.stateService.currentSubject == 1 ? secondary = '#323232' : secondary = '#ffffff';
    this.elementRef.nativeElement.style.setProperty('--sidebar-primary', primray);
    this.elementRef.nativeElement.style.setProperty('--sidebar-secondary', secondary);
  }
}
