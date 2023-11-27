import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Project } from '../../modules/project.module';
import { photoService } from '../../Services/photoService';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
  animations: [trigger('popOut', [
    state('in', style({
      'transform': 'scale(1)'
    })),
    state('out', style({
      'transform': 'scale(0)',
      'background-color' : 'transparent'
    })),
    transition('in <=> out', animate(200))
  ])]
})                                 
export class PhotoGalleryComponent implements OnInit, AfterViewInit {
  activeProject: Project = null;
  projectImages: string[] = [];
  galleryState = 'in';
  selectedIndex = 0;
  pressable:boolean = true;

  constructor(private photoService: photoService) { }

  ngAfterViewInit(): void {
    this.scrollGallery();
  }

  ngOnInit(): void {
    this.photoService.activeProject.subscribe(erg => {
      this.activeProject = erg;
      let width = window.innerWidth;
      width > 600 ? this.projectImages = this.activeProject.imagesDesktop :  this.projectImages = this.activeProject.imagesMobile;
    });
    this.photoService.getProject();
    this.selectedIndex = this.photoService.photoGalleryIndex;
  }

  addEvent(){
    window.addEventListener('resize', () => {
      let width = window.innerWidth;
      width >= 600 ? this.projectImages = this.activeProject.imagesDesktop : this.projectImages = this.activeProject.imagesMobile;
    });
  }

  scrollGallery() {
    const container = document.querySelector('#photoGalleryContainer');
    const image = document.querySelector('.photoGalleryImage');
    container.scrollLeft =  this.selectedIndex * image.clientWidth;
  }

  closeGallery() {
    this.galleryState = 'out';
    setTimeout(() => {
      this.photoService.photoGalleryActive.next(false);
    }, 200);
  }

  scrollRight(){
    if(!this.pressable) return;
    this.pressable = false;
    const container = document.querySelector('#photoGalleryContainer');
    const image = document.querySelector('.photoGalleryImage');
    container.scrollLeft += image.clientWidth;
    setTimeout(() => {
      this.pressable = true;
    }, 500);
  }
  
  scrollLeft(){
    if(!this.pressable) return;
    this.pressable = false;
    const container = document.querySelector('#photoGalleryContainer');
    const image = document.querySelector('.photoGalleryImage');
    container.scrollLeft -= image.clientWidth;
    setTimeout(() => {
      this.pressable = true;
    }, 500);
  }
}
