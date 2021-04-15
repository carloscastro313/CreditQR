import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { VotarComponent } from './votar/votar.component';



@NgModule({
  exports: [SideMenuComponent, HeaderComponent, VotarComponent],
  declarations: [SideMenuComponent,HeaderComponent,VotarComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class UtilityModule { }
