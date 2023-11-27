
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { photoService } from './Services/photoService';
import { sidebarService } from './Services/sidebarService';
import { stateService } from './Services/stateService';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  sideBarActive:boolean = false;
  isLoading = true;
  visible:boolean = false;

  constructor(private photoService: photoService, private stateService:stateService, private sidebarService:sidebarService) { }
  photoGalleryActive:boolean  = false;
  photoGallerySubscription:Subscription;

  ngOnInit(): void {
    this.photoGallerySubscription = this.photoService.photoGalleryActive.subscribe(erg => this.photoGalleryActive = erg);
    this.stateService.currentSubject = 0;
    this.sidebarService.sidebarSubject.subscribe(erg => this.sideBarActive = erg);
    setTimeout(() => {
      this.visible = true;
    }, 150);
    setTimeout(() => {
      this.isLoading = false;
    }, 2100);
  }

}
