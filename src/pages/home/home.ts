import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AgregarPage, DetallePage, MapaCercanasPage } from '../index.paginas';
import { PartiesProvider } from '../../providers/parties/parties';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AuthSProvider } from '../../providers/auth-s/auth-s';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fiestas:any;
  f:any;
  lista:any[];
  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    private parties:PartiesProvider,
    private ubicacionP:UbicacionProvider,
    private authS:AuthSProvider) {

  }

  showPrompt(){
    const prompt = this.alertCtrl.create({
      title: 'Invitación',
      message: "Introduce el código de la fiesta",
      inputs: [
        {
          name: 'codigo',
          placeholder: 'Código'
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
            this.parties.obtenerUna(data.codigo).then( exist => {
              if( exist ){
                this.f = this.parties.f;
                if(this.f.invitados){
                  this.lista = this.f.invitados;
                  this.lista.push(this.authS.user.uid);
                  this.parties.aceptarInvitacion(data.codigo, this.lista);
                }else{
                  this.lista = [this.authS.user.uid];
                  this.parties.aceptarInvitacion(data.codigo, this.lista);
                }
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }

  mapaCercanas(){
    let f=[];
    for (let fiesta of this.fiestas) {
        if(fiesta.distancia<10){
          f.push(fiesta);
        }
    }
    this.navCtrl.push(MapaCercanasPage, {'fiestas':f})
  }

  nuevoEvento(){
    this.navCtrl.push(AgregarPage);
  }

  detalle(fiesta:any){
    console.log('detalle: ', fiesta);
    this.navCtrl.push(DetallePage, {'fiesta':fiesta});
  }

  ionViewDidLoad() {
    this.parties.obtenerFiestas(this.authS.user.uid)
    .then( exists => {
      if (exists){
        this.ubicacionP.actual().then( existe => {
          if (existe){
            console.log(this.fiestas);
          }
        });
      }
    });
    this.parties.fiestasObs()
      .subscribe(
        data => {this.fiestas=data}
      );
  }
}
