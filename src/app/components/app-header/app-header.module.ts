import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppHeaderComponent } from './app-header';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [AppHeaderComponent],
  exports: [AppHeaderComponent]
})
export class AppHeaderModule {}
