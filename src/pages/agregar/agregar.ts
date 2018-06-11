import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../index.paginas';
import { PartiesProvider } from '../../providers/parties/parties';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AuthSProvider } from '../../providers/auth-s/auth-s';

/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
    ub:any;
  	addForm: FormGroup;
  	addError: string;
    bebidas:any[]=[];
    comidas:any[]=[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      fb:FormBuilder,
      private ubicacionP:UbicacionProvider,
      private fiestaP:PartiesProvider,
      private authS:AuthSProvider
    ) {
      this.addForm = fb.group({
        bebidas: fb.group({
          marca:'',
          cantidad:''
        }),
        comidas: fb.group({
          plato:'',
          cantidad:''
        })
      });
  }

  moreBebida(){
    let marca = this.addForm.get('bebidas.marca').value;
    let cant = this.addForm.get('bebidas.cantidad').value;
    if (marca!="") {
      this.bebidas.push({'marca':marca,'cantidad':cant});
      this.addForm.get('bebidas.marca').setValue('');
      this.addForm.get('bebidas.cantidad').setValue('');
    }
  }

  moreComida(){
    let plato = this.addForm.get('comidas.plato').value;
    let cant = this.addForm.get('comidas.cantidad').value;
    if (plato!="") {
      this.comidas.push({'plato':plato,'cantidad':cant});
      this.addForm.get('comidas.plato').setValue('');
      this.addForm.get('comidas.cantidad').setValue('');
    }
  }

  abrirMapa(){
    this.navCtrl.push( MapaPage, {'ubicacion':this.ub} );
  }

  add(){
    let lat = this.ubicacionP.coordNuevas.lat;
    let lng = this.ubicacionP.coordNuevas.lng;
    this.moreBebida();
    this.moreComida();
    let userId = this.authS.user.uid;
    let data ={
      'userId':userId,
      'bebidas':this.bebidas,
      'comida':this.comidas,
      'lat':lat,
      'lng':lng
    }
    this.fiestaP.addFiesta(data);
  }

  ionViewDidLoad() {
    this.ubicacionP.actual().then( exists => {
      if (exists){
        this.ub = this.ubicacionP.posi;
      }
    });
  }

}
