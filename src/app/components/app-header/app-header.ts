import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html',
  styleUrls: ['app-header.scss']
})
export class AppHeaderComponent {
  @Input()
  showButtonBack: string = '';
  @Input()
  showButtonHelp: boolean = false;
  @Input()
  showButtonLogout: boolean = false;
  @Input()
  showButtonAddCredits: boolean = false;
  @Input()
  title: string;
  @Input()
  iconTitle: string = '';

  // TODO: Juntar os botões do mesmo lado em um só e usar função verificadora
  // diminuindo a qtd de flags

  @Output()
  public eventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController, 
    private router: Router,
    private authService: AuthService
  ) {}

  helpModal() {
    this.navCtrl.navigateForward('/');
  }

  goToAddCredits() {
    this.navCtrl.navigateForward('/adicionar-creditos');
  }

  logout() {
    this.authService.deleteAuthData().then(() => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
    });
  }
}
