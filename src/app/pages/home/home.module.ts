import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { Routes, RouterModule } from '@angular/router';
import { AppHeaderModule } from 'src/app/components/app-header/app-header.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AppHeaderModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
