import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AgregarPage, DetallePage, EditarPage } from '../index.paginas';
import { PartiesProvider } from '../../providers/parties/parties';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AuthSProvider } from '../../providers/auth-s/auth-s';

@IonicPage()
@Component({
  selector: 'page-mis-eventos',
  templateUrl: 'mis-eventos.html',
})
export class MisEventosPage {
  fiestas:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    private parties:PartiesProvider,
    private ubicacionP:UbicacionProvider,
    private auth: AuthSProvider) {
  }

  nuevoEvento(){
    this.navCtrl.push(AgregarPage);
  }

  detalle(fiesta:any){
    this.navCtrl.push(DetallePage, {'fiesta':fiesta});
  }

  editar(fiesta:any){
    this.navCtrl.push(EditarPage, {'fiesta':fiesta});
  }

  borrar(fiesta:any){
    this.showPrompt(fiesta.id);
  }

  showPrompt(id){
    const prompt = this.alertCtrl.create({
      title: 'Borrar',
      message: "Estás seguro de que quieres borrar el evento?",
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
              this.parties.borrarEvento(id);
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    this.parties.obtenerMisFiestas(this.auth.user.uid)
    .then( exists => {
      if (exists){
        this.ubicacionP.mis_fiestas_posi().then( existe => {
          if (existe){
          }
        });
      }
    });
    this.parties.misFiestasObs()
    .subscribe(
        data => {
          this.fiestas=data
        });
  }

}
