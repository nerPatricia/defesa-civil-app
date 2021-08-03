import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  private toast;

  async present({ message, duration = 3000, options = {} }) {
    if (this.toast) {
      await this.toast.dismiss();
    }

    this.toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
      ...options
    });

    await this.toast.present();
  }
}
