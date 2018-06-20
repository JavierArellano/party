import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthSProvider } from '../../providers/auth-s/auth-s';
import { PartiesProvider } from '../../providers/parties/parties';
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
    private fiestaP:PartiesProvider,
    private authS:AuthSProvider
  ) {
    this.fiesta = navParams.get('fiesta');
    if(this.fiesta.userId == this.authS.user.uid){
      this.mia=true;
    }
  }

  abandonar(){
    let uid = this.authS.user.uid;
    let i = this.fiesta.invitados.indexOf(uid);
    this.fiesta.invitados.splice(i, 1);
    this.fiestaP.editFiesta(this.fiesta);
    this.navCtrl.popToRoot();
  }

  compartir(){
    this.socialSharing.shareViaWhatsApp("Desde la aplicación *Let's Party* has sido invitado a un evento, para aceptar la invitación introduce el siguiente codigo en Invitaciones: \n"+this.fiesta.id);
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
