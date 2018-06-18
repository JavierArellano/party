import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Geolocation } from '@ionic-native/geolocation';
import { PartiesProvider } from '../parties/parties';


@Injectable()
export class UbicacionProvider {
  posi;
  coordNuevas;
  private distance: Subject<any> = new Subject<any>();
  constructor(private geolocation:Geolocation, private parties:PartiesProvider ) {
  }

  distancia(lat2,lng2){
    let lat1 = this.posi.coords.latitude;
    let lng1 = this.posi.coords.longitude;
    let dist = this.calcular(lat1,lat2,lng1,lng2);
    this.distance.next(dist);
    return dist;
  }

  distanceObs(): Observable<any>{
  	return this.distance.asObservable();
  }

  calcular(lat1,lat2,lng1,lng2){
    let R = 6371000;
    let lt1 = this.deg2rad(lat1);
    let lt2 = this.deg2rad(lat2);
    let ln1 = this.deg2rad(lat2-lat1);
    let ln2 = this.deg2rad(lng2-lng1);
    let a = Math.sin(ln1/2)*Math.sin(ln1/2)+Math.cos(lt1)*Math.cos(lt2)*Math.sin(ln2)*Math.sin(ln2);
    let c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    let dist = (R*c)/1000;
    return dist.toFixed(2);
  }

  deg2rad(deg){
    return deg*(Math.PI/180);
  }

  soloPos(){
    return new Promise( (resolve, reject)=>{
      if(this.posi){
        resolve(true);
      }else{
        this.geolocation.getCurrentPosition().then((resp) => {
           // resp.coords.latitude
           // resp.coords.longitude
          this.posi=resp;
          this.geolocation.watchPosition().subscribe((data) => {
             // data can be a set of coordinates, or an error (if an error occurred).
             // data.coords.latitude
             // data.coords.longitude
            if(data){
              this.posi=data;
              resolve(true);
            }else{
              console.log('fallo soloPos posi:', this.posi);
              resolve(false);
            }
          });
        });
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  mis_fiestas_posi() {
    return new Promise( (resolve, reject)=>{
      this.soloPos().then( exist => {
        if(exist){
          console.log('ubicacion.ts', this.posi)
          for (let i = 0; i < this.parties.mis_fiestas.length; i++) {
            this.parties.mis_fiestas[i].distancia = this.distancia(this.parties.mis_fiestas[i].lat,this.parties.mis_fiestas[i].lng)
          }
          this.parties.addmisfiestasObs();
          resolve(true);
        }else{
          console.log('fallo');
          resolve(false);
        }
      })
    });
  }
  actual() {
    return new Promise( (resolve, reject)=>{
      this.soloPos().then( exist => {
        if(exist){
          for (let i = 0; i < this.parties.fiestas.length; i++) {
            this.parties.fiestas[i].distancia = this.distancia(this.parties.fiestas[i].lat,this.parties.fiestas[i].lng)
          }
          this.parties.addfiestasObs();
          resolve(true);
        }else{
          console.log('fallo posi:', this.posi);
          resolve(false);
        }
      })
    });
  }
}
