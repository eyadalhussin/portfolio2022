import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
  animations:[
    trigger('showText', [
      state('open', style({
        'width' : '80%',
      })),
      state('closed', style({
        'width' : '50%',
      })),
      transition('open <=> closed', animate(300))
    ])
  ]
})
export class ServiceCardComponent implements OnInit {
  textState: string = 'closed';
  textShown:boolean = false;
  @Input('headline') headline:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  toggleText(){
    if(this.textShown){
      this.textShown = false;
      this.textState = 'closed';
    } else {
      this.textState = 'open';
      setTimeout(() => {
        this.textShown = true;
      }, 300);
    }
  }
}
