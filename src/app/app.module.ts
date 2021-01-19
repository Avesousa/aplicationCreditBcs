import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

//App components
import { AppComponent } from './app.component';

//App modules
import { MainModule } from './components/main/main.module';

//Plugin
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { MomentModule } from 'ngx-moment';

// Services
import { UserService } from './components/auth/services/user.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';

registerLocaleData(localeEs, 'es-AR');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    MomentModule,
    MainModule,
  ],
  providers: [CookieService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
