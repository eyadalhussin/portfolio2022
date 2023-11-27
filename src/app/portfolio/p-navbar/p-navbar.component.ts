import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { sidebarService } from '../Services/sidebarService';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-p-navbar',
  templateUrl: './p-navbar.component.html',
  styleUrls: ['./p-navbar.component.css']
})
export class PNavbarComponent implements OnInit {
  mainColor:string  = 'white';
  colorSubscription: Subscription;
  constructor(private stateService: stateService, private sidebarService:sidebarService) { }

  ngOnInit(): void {
    this.colorSubscription = this.stateService.mainColor.subscribe(erg => this.mainColor = erg);
  }

  navigateToHome(){
    this.stateService.navDown();
    setTimeout(() => {
      this.stateService.navDown();
    }, 600);
  }

  openSidebar(){
    this.sidebarService.openSidebar();
  }

}
