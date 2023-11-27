import { Component, OnInit } from '@angular/core';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent implements OnInit {

  constructor(private stateService: stateService) { }

  ngOnInit(): void {

  }

  navUp() {
    this.stateService.navDown();
  }
  
  navDown() {
    this.stateService.navUp();
  }

}
