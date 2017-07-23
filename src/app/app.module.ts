import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';


// by default, this client will send queries to `/graphql` (relative to the URL of your app)
export function provideClient(): ApolloClient {
  return new ApolloClient({
    // see - http://dev.apollodata.com/angular2/cache-updates.html#dataIdFromObject
    dataIdFromObject: (o: any) => `${o.__typename}-${o.id},`,

    // see - http://dev.apollodata.com/angular2/initialization.html
    networkInterface: createNetworkInterface({
      uri: 'https://aks-graphql-sample1.glitch.me/',

    }),
  });;
}


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ApolloModule.forRoot(provideClient)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
