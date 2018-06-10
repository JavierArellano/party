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
  TabsPage
} from '../pages/index.paginas';
import { AuthSProvider } from '../providers/auth-s/auth-s';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

//plugins
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../config';

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
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    NgxErrorsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9dXYzLu_sVtnnIn0stdMrSjN34eADYCg'
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
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthSProvider
  ]
})
export class AppModule {}
