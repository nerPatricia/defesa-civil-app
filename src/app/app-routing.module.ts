import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren:
      './pages/home/home.module#HomePageModule'
  },
  {
    path: 'cadastrar-usuario',
    loadChildren:
      './pages/cadastrar-usuario/cadastrar-usuario.module#CadastrarUsuarioPageModule'
  },
  {
    path: 'dashboard',
    loadChildren:
      './pages/dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'cadastrar-notificacao',
    loadChildren:
      './pages/cadastrar-notificacao/cadastrar-notificacao.module#CadastrarNotificacaoPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
