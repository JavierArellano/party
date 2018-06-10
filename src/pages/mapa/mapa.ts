import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  lat:number;
  lng:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lat = 37.1836433;
    this.lng = -3.6065851;
  }


}
