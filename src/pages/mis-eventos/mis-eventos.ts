import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AgregarPage, DetallePage } from '../index.paginas';
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

  constructor(public navCtrl: NavController, private parties:PartiesProvider, private ubicacionP:UbicacionProvider, private auth: AuthSProvider) {
  }

  nuevoEvento(){
    this.navCtrl.push(AgregarPage);
  }

  detalle(fiesta:any){
    console.log('detalle: ', fiesta);
    this.navCtrl.push(DetallePage, {'fiesta':fiesta});
  }

  borrar(fiesta:any){
    this.parties.borrarEvento(fiesta.id);
  }

  ionViewDidLoad() {
    this.parties.obtenerMisFiestas(this.auth.user.uid)
    .then( exists => {
      if (exists){
        this.ubicacionP.mis_fiestas_posi().then( existe => {
          if (existe){
            console.log(this.ubicacionP.posi);
          }
        });
      }
    });
    this.parties.misFiestasObs()
    .subscribe(
        data => {
          this.fiestas=data
          console.log('data:', data)
        });
  }

}
