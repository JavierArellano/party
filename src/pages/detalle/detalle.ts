import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthSProvider } from '../../providers/auth-s/auth-s';
//pluggins
import { SocialSharing } from '@ionic-native/social-sharing';

//pages
import { MapaDetallePage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  fiesta:any;
  mia:boolean=false;
  mostrarCom:boolean=false;
  mostrarBeb:boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing:SocialSharing,
    private authS:AuthSProvider
  ) {
    this.fiesta = navParams.get('fiesta');
    if(this.fiesta.userId == this.authS.user.uid){
      this.mia=true;
    }

    console.log('lat:' + this.fiesta.lat,'lng:' + this.fiesta.lng);
  }

  compartir(){
    this.socialSharing.shareViaWhatsApp(this.fiesta.id);
  }

  mostrarMapa(){
      this.navCtrl.push( MapaDetallePage, { 'fiesta':this.fiesta, 'lat': this.fiesta.lat, 'lng':this.fiesta.lng } );
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
