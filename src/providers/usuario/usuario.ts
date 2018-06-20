import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthSProvider } from '../auth-s/auth-s';
import {Observable, Subject } from 'rxjs/Rx';


@Injectable()
export class UsuarioProvider {
  perfil;
  creadorPerfil;
  constructor(
    private afDB: AngularFirestore,
    private authS:AuthSProvider
  ) {
  }

  addPerfil(data:any){
    this.afDB.collection('usuarios').doc(data.uid).set(data);
  }

  editPerfil(perfil:any){
    this.afDB.doc(`/usuarios/${perfil.uid}`).update(perfil);
  }

  getMiPerfil(uid){
    return new Promise( (resolve, reject )=>{
      this.afDB.doc(`/usuarios/${uid}`).valueChanges().subscribe( data => {
        if(data){
          this.perfil = data;
          resolve(true);
        }else{
          let d = {
            'uid': uid,
            'email': this.authS.user.email
          }
          this.addPerfil(d);
          resolve(false);
        }
      })
    })
  }

  getCreadorPerfil(uid){
    return new Promise( (resolve, reject )=>{
      this.afDB.doc(`/usuarios/${uid}`).valueChanges().subscribe( data => {
        if(data){
          this.creadorPerfil = data;
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }
}
