import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartiesProvider } from '../../providers/parties/parties';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { MapaPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {
    	addForm: FormGroup;
    	addError: string;
      fiesta:any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      fb:FormBuilder,
      private ubicacionP:UbicacionProvider,
      private fiestaP:PartiesProvider,
    ) {
      this.fiesta = this.navParams.get('fiesta');
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
    this.fiesta.bebidas.splice(i, 1);
  }

  borrarC(i){
    this.fiesta.comida.splice(i, 1);
  }

  moreBebida(){
    let marca = this.addForm.get('bebidas.marca').value;
    let cant = this.addForm.get('bebidas.cantidad').value;
    if (marca!="") {
      this.fiesta.bebidas.push({'marca':marca,'cantidad':cant});
      this.addForm.get('bebidas.marca').setValue('');
      this.addForm.get('bebidas.cantidad').setValue('');
    }
  }

  moreComida(){
    let plato = this.addForm.get('comidas.plato').value;
    let cant = this.addForm.get('comidas.cantidad').value;
    if (plato!="") {
      this.fiesta.comida.push({'plato':plato,'cantidad':cant});
      this.addForm.get('comidas.plato').setValue('');
      this.addForm.get('comidas.cantidad').setValue('');
    }
  }

  abrirMapa(){
    this.navCtrl.push( MapaPage, {'ubicacion':{'coords':{'latitude': this.fiesta.lat,'longitude':this.fiesta.lng}}} );
  }

  add(){
    if(this.ubicacionP.coordNuevas ){
      this.fiesta.nombre = this.addForm.get('nombre').value;
      if (this.fiesta.nombre!=''){
        this.fiesta.lat = this.ubicacionP.coordNuevas.lat;
        this.fiesta.lng = this.ubicacionP.coordNuevas.lng;
        this.ubicacionP.coordNuevas=null;
        this.moreBebida();
        this.moreComida();
        this.fiestaP.editFiesta(this.fiesta);
        this.navCtrl.popToRoot();
      }
    }
    this.fiesta.nombre = this.addForm.get('nombre').value;
    if (this.fiesta.nombre!=''){
      this.moreBebida();
      this.moreComida();
      this.fiestaP.editFiesta(this.fiesta);
      this.navCtrl.popToRoot();
    }
  }

  ionViewDidLoad() {
  }

}
