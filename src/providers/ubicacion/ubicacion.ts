import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class UbicacionProvider {
  posi;
  coordNuevas;
  constructor( private geolocation:Geolocation ) {
  }
  actual() {
    return new Promise( (resolve, reject )=>{
      this.geolocation.getCurrentPosition().then((resp) => {
       // resp.coords.latitude
       // resp.coords.longitude
       if(resp){
         this.posi=resp;
         resolve(true);
       }else{
         console.log('fallo');
         resolve(false);
       }
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
}
