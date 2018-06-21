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
  mostrarInv:boolean=false;
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
        console.log('creador perfil', this.fiesta);
      }
    })
  }

  abandonar(){
    //genera el alert que pide la confirmacion para abandonar un evento
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
            // si acepta, elimino el perfil del usuario de la lista de invitados y guardo el evento.
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
    //abre whatsapp para enviar el mensaje al contacto seleccionado.
    this.socialSharing.shareViaWhatsApp("Desde la aplicación *Let's Party* has sido invitado a un evento, para aceptar la invitación introduce el siguiente codigo en Invitaciones: \n"+this.fiesta.id);
  }

  mostrarMapa(){
    //te redirige a la pagina del mapa pasando por parametros el evento y sus coordenadas.
      this.navCtrl.push( MapaDetallePage, { 'fiesta':this.fiesta, 'lat': this.fiesta.lat, 'lng':this.fiesta.lng } );
  }
  //desplegan los listados.
  mostrarI(){
    if(this.mostrarInv){
      this.mostrarInv=false;
    }else{
      this.mostrarInv=true;
    }
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
