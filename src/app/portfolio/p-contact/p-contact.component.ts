import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { stateService } from '../Services/stateService';

@Component({
  selector: 'app-p-contact',
  templateUrl: './p-contact.component.html',
  styleUrls: ['./p-contact.component.css'],
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
  ]),
  trigger('fadeOut', [
    transition(':leave', [
      style({ opacity: 1 }),
      animate('300ms ease-out', style({ opacity: 0 }))
    ])
  ]),
  trigger('popIn', [
    transition(':enter', [
      style({ transform: 'scale(0)' }),
      animate('300ms ease-out', style({ transform: 'scale(1)' }))
    ])
  ]),
  trigger('popOut', [
    transition(':leave', [
      style({ transform: 'scale(1)' }),
      animate('300ms ease-out', style({transform: 'scale(0)'}))
    ])
  ])]
})
export class PContactComponent implements OnInit {
  contState: string = '1';
  stateSubscription: Subscription;
  contactText: string = "eyad.alhussin11@gmail.com";
  contactTextClickable: boolean = true;
  keyboardOpened: boolean = false;
  prevHeight:number;
  buttonText:string = 'Send';
  contactContainerAnimation:boolean = false;
  @ViewChild('form') form:NgForm;

  @HostListener('window:resize')
  onResize(){
    const height = window.innerHeight;
    if(this.prevHeight - height > 250){
      this.keyboardOpened = true;
    } else {
      this.keyboardOpened = false;
    }
    this.prevHeight = height;
  }

  constructor(private stateService: stateService, private http:HttpClient) { }

  ngOnInit(): void {
    this.stateSubscription = this.stateService.subjectsArray[2].subscribe(erg => {
      this.contState = erg;
      erg === '0-index0' ? this.contactContainerAnimation = true : this.contactContainerAnimation = false;
    });
    this.prevHeight = window.innerHeight;
  }

  setContactText(text: string) {
    if (!this.contactTextClickable) return;
    this.contactTextClickable = false;
    this.contactText = "";
    setTimeout(() => {
      this.contactText = text;
      this.contactTextClickable = true;
    }, 300);
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;
    let date = new Date().toISOString().slice(0, 10);
    this.buttonText = "Thanks !";
    setTimeout(() => {
      this.buttonText = "Send";
      form.reset();
    }, 2000);
    this.http.post('https://website-cff9d-default-rtdb.firebaseio.com/messages.json', [form.value, date]).subscribe();
  }

  navigateToLinkedin(){
    window.open('https://www.linkedin.com/in/eyad-alhussin-254375266/', '_blank');
  }
}
