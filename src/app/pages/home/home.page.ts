import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;
  checkAgente = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group(
      {
        cpf: new FormControl("", [Validators.required]),
        senha: new FormControl("", [Validators.required]),
      }
    );
  }

  ngOnInit() {}

  onCheck(event) {
    this.checkAgente = event.detail.checked;
  }

  cadastrar() {
    this.router.navigateByUrl('/cadastrar-usuario');
  }

  login() {
    const tipoUsuario = this.checkAgente ? 'agente' : 'cidadao';

    this.authService.login(this.form.get('cpf').value, this.form.get('senha').value, tipoUsuario).then(
        async (response: any) => {
          await this.authService.saveAuth({ token: response.token, tipo: tipoUsuario, bairro: response.bairro });
          this.router.navigateByUrl('/dashboard');
        }, error => {
          Swal.fire('Atenção', 'Usuário e/ou senha inválidos.', 'warning');
          console.log(error);
        }
    );
  }

  esqueciSenha() {
    // this.router.navigateByUrl('/esqueci-senha');
  }
}
