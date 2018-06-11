import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AgregarPage } from '../index.paginas';
import { PartiesProvider } from '../../providers/parties/parties';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fiestas:any;
  constructor(public navCtrl: NavController, private parties:PartiesProvider) {

  }
  nuevoEvento(){
    this.navCtrl.push(AgregarPage);
  }

  ionViewDidLoad() {
    this.parties.obtenerFiestas()
    .then( exists => {
      if (exists){
        this.fiestas = this.parties.fiestas;
        console.log(this.fiestas);
      }else{

      }
    });
  }
}
