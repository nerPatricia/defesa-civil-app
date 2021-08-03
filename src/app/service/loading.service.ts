import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
  loadingIndicator;

  constructor(private loadingCtrl: LoadingController) {}

  async present({ message = 'Aguarde...' } = {}) {
    if (this.loadingIndicator) {
      this.dismiss();
    }

    this.loadingIndicator = await this.loadingCtrl.create({
      spinner: 'dots',
      message
    });
    return await this.loadingIndicator.present();
  }

  dismiss() {
    if (!this.loadingIndicator) {
      return;
    }

    this.loadingIndicator.dismiss();
  }
}
