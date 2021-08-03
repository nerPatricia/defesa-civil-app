import { BAIRROS } from './bairros-mock';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NavController } from "@ionic/angular";
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: "cadastrar-usuario.page.html",
  styleUrls: ["cadastrar-usuario.page.scss"],
})
export class CadastrarUsuarioPage implements OnInit, AfterContentChecked {
  form: FormGroup;
  checkAgente = false;
  maxDate: string;
  bairros = BAIRROS;

  constructor(
    private navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private detectorChanges: ChangeDetectorRef
    ) {
      const todayDate = new Date();
      this.maxDate = new Date(todayDate.setFullYear(todayDate.getFullYear() - 18)).toISOString();
      console.log(this.maxDate)
    }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
        sobrenome: new FormControl("", [Validators.required]),
        cpf: new FormControl("", [Validators.required, Validators.minLength(11)]),
        dataDeNascimento: new FormControl(""), // yyyy-MM-dd
        senha: new FormControl("", [Validators.required]),
        checkSenha: new FormControl("", [Validators.required]),
        admin: new FormControl(false),
        /* ****** OBRIGATORIO DE AGENTE ****** */
        emprego: new FormControl(""),
        email: new FormControl("", [Validators.email]),
        /* ****** OBRIGATORIO DE CIDADÃO ****** */
        cep: new FormControl(""),
        bairro: new FormControl("")
      },
      {
        validator: [this.checkIfMatchingPasswords("senha", "checkSenha")]
      }
    );
  }

  onCheck(event) {
    this.checkAgente = event.detail.checked;
  }

  ngAfterContentChecked() {
    this.detectorChanges.detectChanges();
  }

  checkIfMatchingPasswords(senha: string, confirmaSenha: string) {
    return (group: FormGroup) => {
      const senhaInput = group.controls[senha],
        confirmaSenhaInput = group.controls[confirmaSenha];
      if (senhaInput.value != confirmaSenhaInput.value) {
        return confirmaSenhaInput.setErrors({ notEquivalent: true });
      } else if (
        confirmaSenhaInput.value == "" ||
        confirmaSenhaInput.value == null
      ) {
        return confirmaSenhaInput.setErrors({ required: true });
      } else {
        return confirmaSenhaInput.setErrors(null);
      }
    };
  }

  // TODO: RETIRAR ESSA BOSTA
  obrigatoriosAgenteOuCidadao(emprego: string, email: string, cep: string, bairro: string) {
    return (group: FormGroup) => {
      const empregoInput = group.controls[emprego], 
            emailInput = group.controls[email],
            cepInput = group.controls[cep],
            bairroInput = group.controls[bairro];

      if (this.checkAgente) {
        return (
          empregoInput.setErrors({ required: true }), 
          emailInput.setErrors({ required: true }),
          cepInput.setErrors(null),
          bairroInput.setErrors(null)
        );
      } else {
        return (
          empregoInput.setErrors(null), 
          emailInput.setErrors(null),
          cepInput.setErrors({ required: true }),
          bairroInput.setErrors({ required: true })
        );
      }
    };
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

  cadastrar() {
    if (this.checkAgente) {
      this.form.removeControl('cep');
      this.form.removeControl('bairro');
    } else {
      this.form.removeControl('email');
      this.form.removeControl('emprego')
    }

    console.log(this.form.value);

    this.authService.registerUser(this.form.value, this.checkAgente ? 'agente' : 'cidadao').then(
      (response) => {
        Swal.fire('Sucesso', 'Usuario cadastrado com sucesso, faça login para continuar.', 'success').then(
          () => {
            this.router.navigateByUrl('/');
          }
        );
      }, error => {
        Swal.fire('Ocorreu um erro ao cadastrar usuário.', 'error');
        console.log(error);
      }
    );
  }
}
