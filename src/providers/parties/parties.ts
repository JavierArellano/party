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
    this.afDB.collection('fiestas').add(data);
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
