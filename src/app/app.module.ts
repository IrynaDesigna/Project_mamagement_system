import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeModule } from './welcome/welcome.module';
import { MainModule } from './main/main.module';
import { SinginModule } from './singin/singin.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    WelcomeModule,
    MainModule,
    SinginModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
