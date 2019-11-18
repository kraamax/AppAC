import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DocenteAddComponent } from './docente-add/docente-add.component';
import { ComplementaryActivityAddComponent } from './complementary-activity-add/complementary-activity-add.component';
import { DocenteListComponent } from './docente-list/docente-list.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { MensajeModalComponent } from './mensaje-modal/mensaje-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocenteEditComponent } from './docente-edit/docente-edit.component';
import { JefeAddComponent } from './jefe-add/jefe-add.component';
import { JefeListComponent } from './jefe-list/jefe-list.component';
import { JefeEditComponent } from './jefe-edit/jefe-edit.component';
import { LoginComponent } from './login/login.component';
import { DocenteService } from './services/docente.service';
import { AuthGuard } from './services/auth.guard';
import { AuthJefeDptoGuard } from './services/auth-jefe-dpto.guard';
import { JefeDepartamentoService } from './services/jefe-departamento.service';
import { AuthLoginGuard } from './services/auth-login.guard';
import { AdminGuard } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DocenteAddComponent,
    ComplementaryActivityAddComponent,
    DocenteListComponent,
    ActivityListComponent,
    MensajeModalComponent,
    DocenteEditComponent,
    JefeAddComponent,
    JefeListComponent,
    JefeEditComponent,
    LoginComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  ,
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      NgbModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent,canActivate:[AuthLoginGuard] },
      { path: 'home',component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'docenteAdd', canActivate:[AuthJefeDptoGuard],component: DocenteAddComponent },
      { path: 'docenteList', canActivate:[AuthJefeDptoGuard], component: DocenteListComponent },
      { path: 'ActivityAdd',canActivate:[AuthJefeDptoGuard], component: ComplementaryActivityAddComponent },
      { path: 'docenteEdit/:id',canActivate:[AuthJefeDptoGuard], component: DocenteEditComponent },
      { path: 'jefeAdd',canActivate:[AdminGuard], component: JefeAddComponent },
      { path: 'jefeList',canActivate:[AdminGuard], component: JefeListComponent },
      { path: 'jefeEdit/:id',canActivate:[AdminGuard], component: JefeEditComponent },
      //{ path: 'login', component: LoginComponent },
    ])
  ],
    providers: [DocenteService,JefeDepartamentoService],
    entryComponents: [MensajeModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
