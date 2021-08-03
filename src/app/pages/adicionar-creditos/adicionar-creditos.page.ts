import { ToastService } from '../../service/toast.service';
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-creditos',
  templateUrl: 'adicionar-creditos.page.html',
  styleUrls: ['adicionar-creditos.page.scss'],
})
export class AdicionarCreditosPage implements OnInit {
  credito = 0;
  saldo = 0;

  constructor(private navCtrl: NavController, private toast: ToastService) {}

  ngOnInit() {}

  getValor(valor) {
    this.credito = valor;

    console.log(valor);
    console.log(this.credito);
  }

  adicionar() {
    if (this.credito == 0) {
      this.toast.present({ message : 'Selecione um valor para continuar' });
      return;
    }
  }

  back() {
    this.navCtrl.navigateForward(['dashboard']);
  }
}
