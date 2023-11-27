import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  mainColor:string = 'white';
  colorSubscription : Subscription;
  constructor(private stateService : stateService) { }

  ngOnInit(): void {
    this.stateService.currentSubject == 1 ? this.mainColor = 'black' : this.mainColor = 'white';
    this.colorSubscription = this.stateService.mainColor.subscribe(erg => {
      this.mainColor = erg;
      const coloredBar = document.querySelector('.barColored') as HTMLElement;
      setTimeout(() => {
        if(this.stateService.currentSubject == 2){
          coloredBar.style.height = "100%";
        }
        else {
          coloredBar.style.height = (33 * (this.stateService.currentSubject + 1)) + '%';
        }
      }, 600);
    });
  }

}
