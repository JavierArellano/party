import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaCercanasPage } from './mapa-cercanas';

@NgModule({
  declarations: [
    MapaCercanasPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaCercanasPage),
  ],
})
export class MapaCercanasPageModule {}
