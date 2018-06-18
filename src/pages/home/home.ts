import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AgregarPage, DetallePage, MapaCercanasPage } from '../index.paginas';
import { PartiesProvider } from '../../providers/parties/parties';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fiestas:any;
  constructor(public navCtrl: NavController, private parties:PartiesProvider, private ubicacionP:UbicacionProvider) {

  }

  mapaCercanas(){
    this.navCtrl.push(MapaCercanasPage, {'fiestas':this.fiestas})
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
        this.ubicacionP.actual().then( existe => {
          if (existe){
            this.parties.fiestasObs()
        	  	.subscribe(
        	      data => {this.fiestas=data;},
        	      );;
            console.log(this.fiestas);
          }
        });
      }else{

      }
    });
  }
}
