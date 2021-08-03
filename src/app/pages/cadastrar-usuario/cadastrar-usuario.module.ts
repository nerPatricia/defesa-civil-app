import { AuthService } from 'src/app/service/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarUsuarioPage } from './cadastrar-usuario.page';
import { Routes, RouterModule } from '@angular/router';
import { AppHeaderModule } from 'src/app/components/app-header/app-header.module';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: CadastrarUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AppHeaderModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [CadastrarUsuarioPage],
  providers: [
    AuthService
  ]
})
export class CadastrarUsuarioPageModule {}
