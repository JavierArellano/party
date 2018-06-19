import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable, Subject } from 'rxjs/Rx';


@Injectable()
export class PartiesProvider {
  fiestas:any;
  mis_fiestas:any;
  f:any;
  private fiestasas: Subject<any> = new Subject<any>();
  private misfiestas: Subject<any> = new Subject<any>();

  constructor(private afDB: AngularFirestore) {
  }


  addFiesta(data:any){
    let id=this.afDB.createId();
    data.id = id;
    this.afDB.collection('fiestas').doc(id).set(data);
  }
  editFiesta(fiesta:any){
    delete fiesta.distancia;
    this.afDB.doc(`/fiestas/${fiesta.id}`).update(fiesta);
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
  addmisfiestasObs(){
    this.misfiestas.next(this.mis_fiestas);
  }
  misFiestasObs(): Observable<any>{
    return this.misfiestas.asObservable();
  }
  borrarEvento(id){
    this.afDB.doc(`/fiestas/${id}`).delete();
  }
  obtenerUna(id){
    return new Promise( (resolve, reject )=>{
      this.afDB.doc(`/fiestas/${id}`).valueChanges().subscribe( data => {
        if(data){
          this.f = data;
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }
  aceptarInvitacion(id, lista){
    console.log(lista);
    this.afDB.doc(`/fiestas/${id}`).update({
      'invitados':lista
    })
  }
  obtenerMisFiestas(userId:string){
    return new Promise( (resolve, reject )=>{
      this.afDB.collection('fiestas', ref => ref.where("userId", "==", userId))
        .valueChanges().subscribe( data => {
          if(data){
            let fiestas:any = data;
            this.mis_fiestas = fiestas.sort(function(a, b) {
                a = new Date(a.fecha);
                b = new Date(b.fecha);
                return a>b ? 1 : a<b ? -1 : 0;
            })
            this.addmisfiestasObs();
            resolve(true);
          }else{
            console.log('fallo');
            resolve(false);
          }
        })
      });
  }

  obtenerFiestas(uid){
    return new Promise( (resolve, reject )=>{
      this.afDB.collection('fiestas')
      .valueChanges().subscribe( data => {

        if(data){
          this.fiestas=data;
          let fiestas2 = this.fiestas.sort(function(a, b) {
              a = new Date(a.fecha);
              b = new Date(b.fecha);
              return a>b ? 1 : a<b ? -1 : 0;
          });
          for (let i = 0; i < fiestas2.length; i++) {
            let hoy = new Date();
            let t = new Date(fiestas2[i].fecha);
            if (t > hoy){
              this.fiestas = fiestas2.slice(i);
              break;
            }
          }
          let f2=[];
          for (let i = 0; i < this.fiestas.length; i++) {
              if(this.fiestas[i].privada){
                if (this.fiestas[i].userId==uid) {
                  f2.push(this.fiestas[i]);
                }else{
                  for (let inv in this.fiestas[i].invitados) {
                      if(this.fiestas[i].invitados[inv]==uid ){
                        f2.push(this.fiestas[i]);
                        break;
                      }
                  }
                }
              }else{
                f2.push(this.fiestas[i]);
              }
          }
          this.fiestas = f2;
          this.addfiestasObs();
          resolve(true);
        }else{
          console.log('fallo');
          resolve(false);
        }

      })
    });
  }

}
