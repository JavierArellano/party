import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthSProvider } from '../../providers/auth-s/auth-s';
import { UsuarioProvider } from '../../providers/usuario/usuario';


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
    private authS:AuthSProvider,
    private usuarioP:UsuarioProvider
  ) {
    this.usuarioP.getMiPerfil( this.authS.user.uid )
    .then( exist => {
      if (exist){
        this.perfil = this.usuarioP.perfil;
        console.log('mi perfil ',this.perfil);
      }
    })
  }

  ionViewDidLoad() {
  }

}
