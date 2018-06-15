import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable, Subject } from 'rxjs/Rx';

/*
  Generated class for the PartiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartiesProvider {
  fiestas:any;
  private fiestasas: Subject<any> = new Subject<any>();
  constructor(private afDB: AngularFirestore) {
  }


  addFiesta(data:any){

    let id=this.afDB.createId();
    data.id = id;
    this.afDB.collection('fiestas').doc(id).set(data);
  }

  ponerId(id){
    this.afDB.doc(`/fiestas/${id}`).update({'id': id});
  }
  addfiestasObs(){
    this.fiestasas.next(this.fiestas);
  }
  fiestasObs(): Observable<any>{
  	return this.fiestasas.asObservable();
  }

  obtenerFiestas(){
    return new Promise( (resolve, reject )=>{
      this.afDB.collection('fiestas')
      .valueChanges().subscribe( data => {

        if(data){
          this.fiestas=data;
          let fiestas2 = this.fiestas.sort(function(a, b) {
              a = new Date(a.fecha);
              b = new Date(b.fecha);
              return a>b ? 1 : a<b ? -1 : 0;
          });;
          for (let i = 0; i < fiestas2.length; i++) {
            let hoy = new Date();
            let t = new Date(fiestas2[i].fecha);
            if (t > hoy){
              this.fiestas = fiestas2.slice(i);
              break;
            }
          }
          resolve(true);
        }else{
          console.log('fallo');
          resolve(false);
        }

      })
    });
  }

}
