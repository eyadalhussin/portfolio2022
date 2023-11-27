import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class stateService {
    currentSubject: number = 0;
    mainColor = new Subject<string>();
    pressable:boolean = true;

    subjectsArray: Subject<string>[] = [
        //Home State
        new Subject<string>(),
        //Projects State
        new Subject<string>(),
        //Contact State
        new Subject<string>()
    ];

    indexArray: Subject<string>[] = [
        //Home Index
        new Subject<string>(),
        //Projects Index
        new Subject<string>(),
        //Contact Index
        new Subject<string>()
    ]

    constructor() {}

    navUp() {
        if (this.currentSubject >= 2 || !this.pressable) return;
        this.pressable = false;
        this.subjectsArray[this.currentSubject + 1].next('0-index1');
        this.subjectsArray[this.currentSubject + 1].next('0-index0');
        this.currentSubject == 1 ? this.mainColor.next('white') : this.mainColor.next('black');
        setTimeout(() => {
            this.subjectsArray[this.currentSubject].next('-1');
            this.currentSubject++;
            this.pressable = true;
        }, 500);
    }
    
    navDown() {
        if (this.currentSubject <= 0 || !this.pressable) return;
        this.pressable = false;        
        this.subjectsArray[this.currentSubject].next('0-index0');
        this.subjectsArray[this.currentSubject - 1].next('0-index0');
        this.subjectsArray[this.currentSubject].next('1');
        this.currentSubject == 1 ? this.mainColor.next('white') : this.mainColor.next('black');
        setTimeout(() => {
            this.currentSubject--;
            this.pressable = true;
        }, 500);
    }
}