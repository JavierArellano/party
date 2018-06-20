import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthSProvider } from '../../providers/auth-s/auth-s';
import { UsuarioProvider } from '../../providers/usuario/usuario';
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
  creadorPerfil;
  mia:boolean=false;
  mostrarCom:boolean=false;
  mostrarBeb:boolean=false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    private socialSharing:SocialSharing,
    private fiestaP:PartiesProvider,
    private usuarioP:UsuarioProvider,
    private authS:AuthSProvider
  ) {
    this.fiesta = navParams.get('fiesta');
    if(this.fiesta.userId == this.authS.user.uid){
      this.mia=true;
    }
    this.usuarioP.getCreadorPerfil( this.fiesta.userId )
    .then( exist => {
      if (exist){
        this.creadorPerfil = this.usuarioP.creadorPerfil;
        console.log('creador perfil', this.creadorPerfil);
      }
    })
  }

  abandonar(){
    this.showPrompt();
  }
  showPrompt(){
    const prompt = this.alertCtrl.create({
      title: 'Abandonar',
      message: "Estás seguro de que quieres salir?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            let uid = this.authS.user.uid;
            let i = this.fiesta.invitados.indexOf(uid);
            this.fiesta.invitados.splice(i, 1);
            this.fiestaP.editFiesta(this.fiesta);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    prompt.present();
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
