import { LoadingService } from './../../service/loading.service';
import { NotificationService } from './../../service/notification.service';
import { BAIRROS } from './../cadastrar-usuario/bairros-mock';
import { AuthService } from 'src/app/service/auth.service';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {
  authData = {};
  notificacoes = [];
  bairroUsuario = null;
  bairros = BAIRROS;

  constructor(
    private navCtrl: NavController, 
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private loading: LoadingService
  ) {}

  ionViewDidEnter() {
    this.notificacoes = [];
    this.authService.getAuthData().then(
      (response) => {
        this.authData = response;
        this.bairroUsuario = response.bairro;
      }, error => {
        console.log("erro ao carregar dados no storage");
      }
    )
  }

  onSelectChange(event) {
    this.loading.present();
    this.notificationService.getNotificacaoPorBairro(event.detail.value).then(
        (response: any) => {
          this.loading.dismiss();
          this.notificacoes = response.notificacoes;
        }, error => {
          this.loading.dismiss();
          console.log("erro ao carregar as notificações");
        }
    )
  }

  novaNotificacao() {
    this.navCtrl.navigateForward(['cadastrar-notificacao']);
  }
}
