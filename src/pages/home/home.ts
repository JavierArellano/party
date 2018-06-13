import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AgregarPage, DetallePage } from '../index.paginas';
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

  detalle(fiesta:any){
    console.log('detalle: ', fiesta);
    this.navCtrl.push(DetallePage, {'fiesta':fiesta});
  }

  ionViewDidLoad() {
    this.parties.obtenerFiestas()
    .then( exists => {
      if (exists){
        let fiestas2 = this.parties.fiestas.sort(function(a, b) {
            a = new Date(a.fecha);
            b = new Date(b.fecha);
            return a>b ? 1 : a<b ? -1 : 0;
        });;
        for (let i = 0; i < fiestas2.length; i++) {
          let hoy = new Date();
          let t = new Date(fiestas2[i].fecha);
          if (t > hoy){
            this.fiestas = fiestas2.slice(i);
            break;
          }
        }
      }else{

      }
    });
  }
}
