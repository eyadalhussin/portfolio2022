import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  dotSelected:number = 1;
  @Input('projectName') projectName:string;
  @Input('projectDesc') projectDesc:string;
  @Input('link') link:string;
  @Input('linkHref') linkHref:string;
  @Input('external') external: boolean = false;
  @ViewChild('sliderContainer') silderContainer:ElementRef;



  prevScrollPos = 0;
  imageWidth;
  multiplikator = 1;


  constructor(private router: Router, private renderer: Renderer2) { 
    
  }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(){
    this.imageWidth = document.querySelector<HTMLElement>('.imageWidth').offsetWidth;
  }

  onSliderScroll(){
    const currentPos  = this.silderContainer.nativeElement.scrollLeft;
    this.dotSelected = +((currentPos / this.imageWidth) + 1).toFixed();
  }

  snapTo(value:number){
    this.silderContainer.nativeElement.scrollLeft = (value-1) * this.imageWidth;
  }

  navigate(){
      this.router.navigate([this.link]);
  }
}
