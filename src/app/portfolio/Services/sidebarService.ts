
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({ providedIn: 'root' })
export class sidebarService {
    sidebarSubject = new Subject<boolean>();
    sidebarActive: boolean = true;
    constructor() {
    }

    toggleSidebar() {
        if (this.sidebarActive) this.sidebarSubject.next(false);
        this.sidebarSubject.next(true);
    }

    openSidebar() {
        this.sidebarSubject.next(this.sidebarActive = true);
    }

    closeSidebar() {
        this.sidebarSubject.next(this.sidebarActive = false);
    }
}