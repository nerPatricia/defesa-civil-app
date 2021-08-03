import { BAIRROS } from './../cadastrar-usuario/bairros-mock';
import { Router } from '@angular/router';
import { NotificationService } from './../../service/notification.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-notificacao',
  templateUrl: 'cadastrar-notificacao.page.html',
  styleUrls: ['cadastrar-notificacao.page.scss'],
})
export class CadastrarNotificacaoPage implements OnInit {
  form: FormGroup;
  bairros = BAIRROS;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.form = this.formBuilder.group(
      {
        bairro: new FormControl("", [Validators.required]),
        titulo: new FormControl("", [Validators.required]),
        descricao: new FormControl("", [Validators.required]),
        gravidade: new FormControl("", [Validators.required]),
        categoria: new FormControl("", [Validators.required]),
      }
    );
  }

  getErrorMessage(field) {
    return this.form.get(field).hasError("required")
      ? "Campo requerido"
      : this.form.get(field).hasError("email")
      ? "Email inválido"
      : this.form.get(field).hasError("minlength")
      ? "Campo inválido"
      : this.form.get(field).hasError("notEquivalent")
      ? "Senhas não coincidem"
      : "";
  }

  isValid(field) {
    if (
      this.form.get(field).value === "" ||
      this.form.get(field).value === null
    ) {
      return false;
    }
    return this.form.get(field).valid;
  }

  isInvalid(field) {
    return (
      !this.form.controls[field].valid && this.form.controls[field].touched
    );
  }

  ngOnInit() {}

  cadastrar() {
    this.notificationService.cadNotificacao(this.form.value).then(
      (response) => {
        Swal.fire('Sucesso', 'Notificação cadastrada com sucesso.', 'success').then(
          () => {
            this.router.navigateByUrl('/dashboard');
          }
        );
      }, error => {
        console.log("erro ao cadastrar notificação");
      }
    )
  }
}
