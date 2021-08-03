import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = environment.url;

  constructor(public http: HttpClient, private authService: AuthService) {}

  async getNotificacaoPorBairro(bairro) {
    const auth = await this.authService.getAuthData();
    const url = `${this.url}/notificacao/listarPorBairro/${bairro}`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${auth.token}` });
    return this.http.get(url, { headers }).toPromise();
  }

  async cadNotificacao(notificacao) {
    const auth = await this.authService.getAuthData();
    const url = `${this.url}/notificacao/cadastrar`;
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${auth.token}` });
    return this.http.post(url, notificacao, { headers }).toPromise();
  }

  // async getCarros() {
  //   const auth = await this.authService.getAuthData();
  //   const url = this.url + '/get-carros';
  //   const headers = new HttpHeaders({ 'token': auth.token });
  //   return this.http.get(url, { headers }).toPromise();
  // }

  // async cadCarros(carroData) {
  //   const auth = await this.authService.getAuthData();
  //   const url = this.url + '/cadastrar-carro';
  //   const headers = new HttpHeaders({ 'token': auth.token });
  //   return this.http.post(url, carroData, { headers }).toPromise();
  // }
}
