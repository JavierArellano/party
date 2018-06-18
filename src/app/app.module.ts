import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {
  AgregarPage,
  DetallePage,
  EditarPage,
  LoginPage,
  HomePage,
  MapaPage,
  SignupPage,
  TabsPage,
  MisEventosPage
} from '../pages/index.paginas';
import { AuthSProvider } from '../providers/auth-s/auth-s';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

//plugins
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from '../config';
import { PartiesProvider } from '../providers/parties/parties';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    AgregarPage,
    DetallePage,
    EditarPage,
    LoginPage,
    HomePage,
    MapaPage,
    SignupPage,
    TabsPage,
    MisEventosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire, 'A Fiestear'),
    AngularFirestoreModule,
    NgxErrorsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8up1WEo6gn0v7jtQeR6OAdz4FhbY1TVI'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgregarPage,
    DetallePage,
    EditarPage,
    LoginPage,
    HomePage,
    MapaPage,
    SignupPage,
    TabsPage,
    MisEventosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthSProvider,
    PartiesProvider,
    UbicacionProvider,
    Geolocation
  ]
})
export class AppModule {}
