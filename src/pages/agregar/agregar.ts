import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../index.paginas';

/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  abrirMapa(){
    this.navCtrl.push( MapaPage );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

}
