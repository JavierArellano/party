import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapaPage } from '../index.paginas';
import { PartiesProvider } from '../../providers/parties/parties';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AuthSProvider } from '../../providers/auth-s/auth-s';


@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
    toggleStatus:boolean=false;
    ub:any;
  	addForm: FormGroup;
  	addError: string;
    myDate: string = new Date().toISOString();
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
      this.ubicacionP.actual().then( exists => {
        if (exists){
          this.ub = this.ubicacionP.posi;
        }
      });
      this.addForm = fb.group({
        nombre:'',
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

  borrarB(i){
    this.bebidas.splice(i, 1);
  }

  borrarC(i){
    this.comidas.splice(i, 1);
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
    //Envia los datos del formulario al proveedor de los eventos para guardarlo.
    if(this.ubicacionP.coordNuevas ){
      let nombre = this.addForm.get('nombre').value;
      if (nombre!=''){
        let lat = this.ubicacionP.coordNuevas.lat;
        let lng = this.ubicacionP.coordNuevas.lng;
        this.ubicacionP.coordNuevas=null;
        this.moreBebida();
        this.moreComida();
        let userId = this.authS.user.uid;
        let data ={
          'userId':userId,
          'privada':this.toggleStatus,
          'nombre':nombre,
          'bebidas':this.bebidas,
          'comida':this.comidas,
          'fecha':this.myDate,
          'lat':lat,
          'lng':lng
        }
        this.fiestaP.addFiesta(data);
        this.navCtrl.popToRoot();
      }
    }
  }

  ionViewDidLoad() {
  }

}
