import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthSProvider } from '../../providers/auth-s/auth-s';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  perfil;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl:AlertController,
    private authS:AuthSProvider,
    private usuarioP:UsuarioProvider,
    private cameraPlugin:Camera
  ) {
    this.usuarioP.getMiPerfil( this.authS.user.uid )
    .then( exist => {
      if (exist){
        this.perfil = this.usuarioP.perfil;
        if (!this.perfil.fecha){
          this.perfil.fecha = new Date().toISOString();
        }
        if (!this.perfil.foto){
          this.perfil.foto = 'https://firebasestorage.googleapis.com/v0/b/a-fiestear.appspot.com/o/anonimo.png?alt=media&token=911a9411-b587-4dad-b753-29750e7d00bf';
        }
        console.log('mi perfil ',this.perfil);
      }
    })
  }

  foto(): void {
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
        const selfieRef = firebase.storage().ref('fotoPerfil/'+this.authS.user.uid+'/fotoPerfil.png');
        selfieRef.putString(profilePicture, 'base64', {contentType: 'image/png'})
          .then(savedProfilePicture => {
              this.perfil.foto = savedProfilePicture.downloadURL
              this.usuarioP.editPerfil(this.perfil);
          });
    }, error => {
      console.log("ERROR Foto -> " + JSON.stringify(error));
    });
  }

  editarNombre(){
    const prompt = this.alertCtrl.create({
      title: 'Nuevo Nombre',
      message: "Introduce tu nombre",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre'
        },
      ],
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
            if(data.nombre!=""){
              this.perfil.nombre = data.nombre;
              this.usuarioP.editPerfil(this.perfil);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  editarNick(){
    const prompt = this.alertCtrl.create({
      title: 'Nuevo Nick',
      message: "Introduce tu nuevo nick",
      inputs: [
        {
          name: 'nick',
          placeholder: 'Nick'
        },
      ],
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
            if(data.nick!=""){
              this.perfil.nick = data.nick;
              this.usuarioP.editPerfil(this.perfil);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  onChange(){
    this.usuarioP.editPerfil(this.perfil);
  }

  ionViewDidLoad() {
  }

}
