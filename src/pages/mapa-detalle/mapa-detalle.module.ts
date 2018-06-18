import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaDetallePage } from './mapa-detalle';

@NgModule({
  declarations: [
    MapaDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(MapaDetallePage),
  ],
})
export class MapaDetallePageModule {}
