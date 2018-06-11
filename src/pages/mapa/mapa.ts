import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';


@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  lat:number;
  lng:number;

  constructor(
    public navCtrl: NavController,
    private ubicacionP:UbicacionProvider,
    public navParams: NavParams) {
    this.lat = navParams.get('ubicacion').coords.latitude;
    this.lng = navParams.get('ubicacion').coords.longitude;
  }

  guardarPos(lat,lng){
    this.ubicacionP.coordNuevas = {'lat':this.lat,'lng':this.lng};
    this.navCtrl.pop();
  }

  selectPosition($event){
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

}
