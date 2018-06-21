import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, LoginPage, AgregarPage, SignupPage, MisEventosPage, PerfilPage } from '../pages/index.paginas';
import { AuthSProvider } from '../providers/auth-s/auth-s';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  login = LoginPage;
  home = HomePage;
  meter = AgregarPage;
  regis = SignupPage;
  mias = MisEventosPage;
  perfil = PerfilPage;
  isLogged:boolean;

  rootPage:any = LoginPage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: AuthSProvider,
    private ubicacionP:UbicacionProvider,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  openHome(){
    this.menuCtrl.toggle();
  	this.rootPage = this.home;
  }

  register(){
    this.menuCtrl.toggle();
  	this.rootPage = this.regis;
  }

  closeMenu(){
    this.menuCtrl.toggle();
  }
  miPerfil(){
    this.menuCtrl.toggle();
    this.rootPage = this.perfil;
  }

  misEventos(){
    this.menuCtrl.toggle();
  	this.rootPage = this.mias;
  }

  nuevoEvento(){
    this.menuCtrl.toggle();
  	this.rootPage = this.meter;
  }

  loginF() {
  	this.auth.signOut();
    this.menuCtrl.toggle();
  	this.rootPage = this.login;
  }

  logout() {
  	this.auth.signOut();
    this.menuCtrl.toggle();
    this.isLogged=false;
  	this.rootPage = this.login;
  }

  initializeApp() {
    //inicializar la app y login automatico.
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = this.home;
            this.isLogged = true;
          } else {
            this.rootPage = this.login;
            this.isLogged = false;
          }
        },
        () => {
          this.rootPage = this.login;
          this.isLogged = false;
        }
      );
      this.ubicacionP.soloPos();
  }
}
