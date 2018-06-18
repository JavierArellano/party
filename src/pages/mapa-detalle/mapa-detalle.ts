import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

@IonicPage()
@Component({
  selector: 'page-mapa-detalle',
  templateUrl: 'mapa-detalle.html',
})
export class MapaDetallePage {
  lat:any;
  lng:any;
  fiesta;
  milat;
  milng;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ubicacionP:UbicacionProvider) {
    this.lat = navParams.get('lat');
    this.lng = navParams.get('lng');
    this.fiesta = navParams.get('fiesta');
    this.milat = this.ubicacionP.posi.coords.latitude;
    this.milng = this.ubicacionP.posi.coords.longitude;
    console.log(this.ubicacionP.posi)
    console.log(this.milat, this.milng)
  }
  centrar(){
    this.milat = this.ubicacionP.posi.coords.latitude;
    this.milng = this.ubicacionP.posi.coords.longitude;
  }



  ionViewDidLoad() {
  }

}
