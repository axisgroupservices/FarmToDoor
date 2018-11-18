import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Ecom9App } from './app.component';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Mock Data
import { Database, Cart } from '../providers/database';

@NgModule({
  declarations: [
    Ecom9App
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(Ecom9App, {
      preloadModules: true,
      backButtonText: '',
      platforms: {
        ios: {
          scrollAssist: false, 
          autoFocusAssist: false,
          statusbarPadding: true,
        },
        android: {
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ecom9App
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Database, 
    Cart
  ]
})
export class AppModule {}
