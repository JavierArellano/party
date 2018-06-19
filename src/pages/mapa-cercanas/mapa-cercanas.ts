import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';

@IonicPage()
@Component({
  selector: 'page-mapa-cercanas',
  templateUrl: 'mapa-cercanas.html',
})
export class MapaCercanasPage {
  fiestas:any[];
  milat;
  milng;
  zoom=18;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ubicacionP:UbicacionProvider) {
    this.fiestas = navParams.get('fiestas');
    this.milat = this.ubicacionP.posi.coords.latitude;
    this.milng = this.ubicacionP.posi.coords.longitude;
  }

  ionViewDidLoad() {
  }

}
