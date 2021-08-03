import { ToastService } from '../../service/toast.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdicionarCreditosPage } from './adicionar-creditos.page';
import { Routes, RouterModule } from '@angular/router';
import { AppHeaderModule } from 'src/app/components/app-header/app-header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdicionarCreditosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AppHeaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdicionarCreditosPage],
  providers: [ToastService]
})
export class AdicionarCreditosPageModule {}
