import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { CategorieModalComponent } from './categorie-modal/categorie-modal.component';
import { ChallengeModalComponent } from './challenge-modal/challenge-modal.component';



@NgModule({
  declarations: [AppComponent, CategorieModalComponent, ChallengeModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
