import { animate, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Project } from '../../modules/project.module';
import { photoService } from '../../Services/photoService';
import { stateService } from '../../Services/stateService';

@Component({
  selector: 'app-device-component',
  templateUrl: './device-component.component.html',
  styleUrls: ['./device-component.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DeviceComponentComponent implements OnInit, AfterViewChecked {
  @Input('deviceAnimation') deviceAnimation:boolean = false;
  activeProject:Project;
  projectImages: string[] = [];
  projectIndex = 0;
  selectedDot: number = 1;
  scrollable: boolean = true;
  selectedIndex = 5;
  galleryOpened: boolean = false;
  isLoading = true;
  container;
  image;
  animationInterval;
  animationCounter:number = 1;
  firstClick:boolean = true;

  constructor(private photoService: photoService, private stateService:stateService) { }

  ngAfterViewChecked(): void {
    this.container = document.querySelector('.projectImageCont');
    this.image = document.querySelector('.imgLaptop');
  }

  ngOnInit(): void {
    this.photoService.activeProject.subscribe(erg =>{
      this.activeProject = erg;
      let width = window.innerWidth;
      width > 600 ? this.projectImages = this.activeProject.imagesDesktop :  this.projectImages = this.activeProject.imagesMobile;
    });
    this.isLoading = false;
    this.photoService.getProject();
    this.addEvent();
    this.stateService.subjectsArray[1].subscribe(erg => {
      if(erg === '0-index0'){
        this.deviceAnimation = true;
      } else {
        this.deviceAnimation = false;
        this.selectedDot = 1;
        this.container.scrollLeft = 0;
      }
    })
    // this.stateService.subjectsArray[1].subscribe(erg => {    
    //   if(erg === '0-index0') {
    //     this.animationInterval = setInterval(() => {
    //       if(this.animationCounter >= 3){
    //         this.container.scrollLeft = 0;
    //         this.animationCounter = 0;
    //         return;
    //       }
    //       this.container.scrollLeft += this.image.clientWidth;
    //       this.animationCounter++;
    //     }, 3000);
    //   } else {
    //     this.container.scrollLeft = 0;
    //     this.animationCounter = 0;
    //     this.selectedDot  = 1;
    //     clearInterval(this.animationInterval);
    //   }
    // })

  }

  setSelectedIndex(index: number) {
    this.selectedIndex = index;
  }

  getNextProject(){
    if(this.projectIndex >= 5) return;
    this.firstClick = true;
    this.selectedDot = 1;
    this.isLoading = true;
    this.photoService.getNextProject();
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
    this.projectIndex++;
  }
  
  getPrevProject(){
    if(this.projectIndex <= 0) return;
    this.firstClick = true;
    this.selectedDot = 1;
    this.isLoading = true;
    this.photoService.getPrevProject();
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
    this.projectIndex--;    
  }

  addEvent(){
    window.addEventListener('resize', () => {
      let width = window.innerWidth;
      width >= 600 ? this.projectImages = this.activeProject.imagesDesktop : this.projectImages = this.activeProject.imagesMobile;
    });
  }


  selectDot(dot: number) {
    if (this.selectedDot < 1 || this.selectedDot > 4 || !this.scrollable) return;
    this.scrollable = false;
    this.container.scrollLeft = this.image.clientWidth * (dot - 1);
    if(this.firstClick){
      setTimeout(() => {
        this.container.scrollLeft = this.image.clientWidth * (dot - 1);
        this.firstClick = false;
      }, 100);
    }
    setTimeout(() => {
      this.selectedDot = dot;
      this.scrollable = true;
    }, 200);
  }

  onSliderScroll() {
    const currentPos = document.querySelector('.projectImageCont').scrollLeft;
    this.selectedDot = +(currentPos / this.image.width + 1).toFixed();
  }

  openGallery(index: number) {
    this.photoService.photoGalleryIndex = index;
    this.photoService.photoGalleryActive.next(true);
  }
}


  // scrollRight() {
  //   if (this.selectedDot >= 4 || !this.scrollable) return;
  //   clearInterval(this.animationInterval);
  //   this.scrollable = false;
  //   this.container.scrollLeft += this.image.clientWidth;
  //   setTimeout(() => {
  //     this.selectedDot++;
  //     this.scrollable = true;
  //   }, 200);
  // }

  // scrollLeft() {
  //   if (this.selectedDot <= 1 || !this.scrollable) return;
  //   clearInterval(this.animationInterval);
  //   this.scrollable = false;
  //   this.container.scrollLeft -= this.image.clientWidth;
  //   setTimeout(() => {
  //     this.selectedDot--;
  //     this.scrollable = true;
  //   }, 200);
  // }