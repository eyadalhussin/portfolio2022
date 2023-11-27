import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ProjectComponent } from './portfolio/project/project.component';
import { PHomeComponent } from './portfolio/p-home/p-home.component';
import { PProjectsComponent } from './portfolio/p-projects/p-projects.component';
import { PContactComponent } from './portfolio/p-contact/p-contact.component';
import { PNavbarComponent } from './portfolio/p-navbar/p-navbar.component';
import { PAboutComponent } from './portfolio/p-about/p-about.component';
import { ServiceCardComponent } from './portfolio/components/service-card/service-card.component';
import { ProgressBarComponent } from './portfolio/progress-bar/progress-bar.component';
import { NavButtonsComponent } from './portfolio/nav-buttons/nav-buttons.component';
import { PhotoGalleryComponent } from './portfolio/components/photo-gallery/photo-gallery.component';
import { DeviceComponentComponent } from './portfolio/components/device-component/device-component.component';
import { PortfolioSpinnerComponent } from './portfolio/components/portfolio-spinner/portfolio-spinner.component';
import { LoadingScreenComponent } from './portfolio/loading-screen/loading-screen.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioSidebarComponent } from './portfolio/portfolio-sidebar/portfolio-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    PHomeComponent,
    PProjectsComponent,
    PContactComponent,
    PNavbarComponent,
    PAboutComponent,
    ServiceCardComponent,
    ProgressBarComponent,
    NavButtonsComponent,
    PhotoGalleryComponent,
    DeviceComponentComponent,
    PortfolioSpinnerComponent,
    LoadingScreenComponent,
    PortfolioComponent,
    PortfolioSidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
