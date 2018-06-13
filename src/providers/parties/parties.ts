import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the PartiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PartiesProvider {
  fiestas:any;
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

  obtenerFiestas(){
    return new Promise( (resolve, reject )=>{
      this.afDB.collection('fiestas')
      .valueChanges().subscribe( data => {

        if(data){
          this.fiestas=data;
          resolve(true);
        }else{
          console.log('fallo');
          resolve(false);
        }

      })
    });
  }

}
