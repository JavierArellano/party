import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AgregarPage } from '../index.paginas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  nuevoEvento(){
    this.navCtrl.push(AgregarPage);
  }
}
