import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-p-home',
  templateUrl: './p-home.component.html',
  styleUrls: ['./p-home.component.css'],
  animations:[trigger('ContState', [
    state('-1', style({
      'transform' : 'translateY(-100%)',
      'z-index': '0'
    })),
    state('0-index0', style({
      'transform': 'translateY(0%)',
      'z-index': '0'
    })),
    state('0-index1', style({
      'transform': 'translateY(0%)',
      'z-index': '1'
    })),
    state('1', style({
      'transform' : 'translateY(100%)',
      'z-index': '0'
    })),
    transition('* <=> *', animate("500ms ease-in-out"))
  ])]
})
export class PHomeComponent implements OnInit, OnDestroy {
  contState:string = '0-index0';
  stateSubscription:Subscription;
  textAnimation:boolean = false;

  constructor(private stateService: stateService) { }
  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.stateSubscription = this.stateService.subjectsArray[0].subscribe(erg => {
      this.contState = erg;
      erg === '0-index0' ? this.textAnimation = true : this.textAnimation = false;
    });
  }

  navigateToProjects(){
    this.stateService.navUp();
  }
  
  navigateToContact(){
    this.stateService.navUp();
    setTimeout(() => {
      this.stateService.navUp();
    }, 600);
  }

}
