import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../modules/project.module';
import { photoService } from '../Services/photoService';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-p-projects',
  templateUrl: './p-projects.component.html',
  styleUrls: ['./p-projects.component.css'],
  animations: [trigger('ContState', [
    state('-1', style({
      'transform': 'translateY(-100%)',
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
      'transform': 'translateY(100%)',
      'z-index': '0'
    })),
    transition('* <=> *', animate("500ms ease-in-out"))
  ])]
})
export class PProjectsComponent implements OnInit, OnDestroy {
  ContState: string = '1';
  photoGalleryActive: boolean = false;
  stateSubscription: Subscription;
  photoGallerySubscription: Subscription;
  activeProject: Project = null;
  isLoading: boolean = true;
  textAnimation:boolean = false;

  constructor(private stateService: stateService,
    private photoService: photoService,
    private router: Router) { }

  ngOnInit(): void {
    this.stateSubscription = this.stateService.subjectsArray[1].subscribe(erg => this.ContState = erg);
    this.photoGallerySubscription = this.photoService.photoGalleryActive.subscribe(erg => this.photoGalleryActive = erg);
    //Wait the Service to fetch the project data then assign it to the active Project
    this.photoService.activeProject.subscribe(erg => {
      this.isLoading = false;
      this.activeProject = erg;
    });
    this.ContState = '1';
    this.stateService.subjectsArray[1].subscribe(erg => {
      erg === '0-index0' ? this.textAnimation = true : this.textAnimation = false;
    })
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  navigate() {
    // // this.router.navigate([this.activeProject.link]);
    // if (this.activeProject.name == 'RichStore') {
    //   window.open('https://ng-richshop.web.app/', '_blank');
    // } else if(this.activeProject.name == 'Kanban'){
    //   window.open('https://kanban-b3785.firebaseapp.com/', '_blank');
    // }
    //  else {
    //   window.open(this.router.createUrlTree([this.activeProject.link]).toString(), '_blank');
    // }
    const protocol = 'https://'; // or 'https://'
    const subdomain = this.activeProject.name;
    const domain = 'e-edev.de';
  
    const url = `${protocol}${subdomain}.${domain}`;
    window.open(url, '_blank');
  }

  navigateToGit(){
    const protocol = 'https://'; // or 'https://'
    const path = this.activeProject.name;
    const domain = 'github.com/eyadalhussin/';
  
    const url = protocol+domain+path;
    window.open(url, '_blank');
  }

}
