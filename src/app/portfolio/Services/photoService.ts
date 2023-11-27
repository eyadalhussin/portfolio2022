import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Project } from "../modules/project.module";

@Injectable({providedIn: 'root'})
export class photoService{
    projects:Project[] = [];
    activeProjectIndex:number = 0;
    activeProject = new Subject<Project>();
    projectsLoaded = new Subject<boolean>();
    
    /**/ 
    photoGalleryActive = new Subject<boolean>();
    photoGalleryIndex = 0;
    /**/ 


    constructor(private http: HttpClient) {
        this.fetchProjects();
    }

    fetchProjects(){
        this.http.get<Project[]>('assets/Portfolio/projects.json').subscribe(erg => {
            this.projects = erg;
            this.activeProject.next(this.projects[0]);
            this.projectsLoaded.next(true);
        })
    }

    getProject(){
        this.activeProject.next(this.projects[this.activeProjectIndex]);
    }

    getNextProject(){
        if(this.activeProjectIndex >= 5) return;
        this.activeProject.next(this.projects[++this.activeProjectIndex]);
    }

    getPrevProject(){
        if(this.activeProjectIndex <= 0) return null;
        this.activeProject.next(this.projects[--this.activeProjectIndex]);
    }

}