import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapaDetallePage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  fiesta:any;
  mostrarCom:boolean=false;
  mostrarBeb:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fiesta = navParams.get('fiesta');
    console.log('lat:' + this.fiesta.lat,'lng:' + this.fiesta.lng);
  }

  mostrarMapa(){
      this.navCtrl.push( MapaDetallePage, { 'lat': this.fiesta.lat, 'lng':this.fiesta.lng } );
  }

  mostrarB(){
    if(this.mostrarBeb){
      this.mostrarBeb=false;
    }else{
      this.mostrarBeb=true;
    }
  }
  mostrarC(){
    if(this.mostrarCom){
      this.mostrarCom=false;
    }else{
      this.mostrarCom=true;
    }
  }

  ionViewDidLoad() {
  }

}
