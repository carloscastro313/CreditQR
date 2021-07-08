import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { VotarComponent } from './votar/votar.component';
import { SplashComponent } from './splash/splash.component';



@NgModule({
  exports: [SideMenuComponent, HeaderComponent, VotarComponent, SplashComponent],
  declarations: [SideMenuComponent,HeaderComponent,VotarComponent, SplashComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class UtilityModule { }
