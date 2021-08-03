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
    private notificationService: NotificationService
  ) {
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
    console.log(event);
    this.notificationService.getNotificacaoPorBairro(event.detail.value).then(
      (response: Array<any>) => {
        this.notificacoes = response;
      }, error => {
        this.notificacoes = [
          {
            bairro: "Varginha",
            titulo: "Enchente",
            descricao: "Enchente devido a forte chuva próximo a delegacia.",
            gravidade: "baixo",
            categoria: "Aviso"
          },
          {
            bairro: "Varginha",
            titulo: "Assalto",
            descricao: "Assalto a mão armada nos arredores do CEAM.",
            gravidade: "media",
            categoria: "Aviso"
          },
          {
            bairro: "Varginha",
            titulo: "Enchente",
            descricao: "Avenida inundada devido a fortes chuvas, impedida a circulação de veiculos.",
            gravidade: "alta",
            categoria: "Desastre",
            status: "encerrado"
          }
        ];
        console.log("erro ao carregar as notificações");
      }
    )
  }

  novaNotificacao() {
    this.navCtrl.navigateForward(['cadastrar-notificacao']);
  }

  visualizarNotificacao(carro) {
    const navigationExtras: NavigationExtras = {
      state: { 
        carroData: carro,
        saldo: ''
       }
    };
    this.router.navigate(['reservar-vaga'], navigationExtras);
  }
}
