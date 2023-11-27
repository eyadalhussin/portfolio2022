import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-about',
  templateUrl: './p-about.component.html',
  styleUrls: ['./p-about.component.css'],
  animations: [
    trigger('arrowState', [
      state('big', style({
        'transform' : 'scale(1.2)'
      })),
      state('small', style({
        'transform' : 'scale(1)'
      })),
      transition('big <=> small', animate(100))
    ])
  ]
})
export class PAboutComponent implements OnInit {
  rightState = "small";
  leftState = "small";
  rightEnd:boolean = false;
  leftEnd:boolean = true;
  count:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  scrollLeft(container: HTMLDivElement){
    if(this.count <= 0) return;
    container.scrollLeft -= container.clientWidth;
    this.count--;
    this.checkCount();
    //Animating
    this.leftState = 'big';
    setTimeout(() => {
        this.leftState = "small";
      }, 100);
    }
    
    scrollRight(container: HTMLDivElement){
    if(this.count >= 2) return;
    container.scrollLeft += container.clientWidth;
    this.count++;
    this.checkCount();
    //Animating
    this.rightState =  'big';
    setTimeout(() => {
      this.rightState = 'small';
    }, 100);
  }


  checkCount(){
    this.leftEnd = this.rightEnd = false;
    if(this.count == 0) this.leftEnd = true;
    if(this.count == 2) this.rightEnd = true;
  }
}

