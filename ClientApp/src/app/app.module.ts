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
import { PlanAccionesAddComponent } from './plan-acciones-add/plan-acciones-add.component';
import { PlanAccionesListComponent } from './plan-acciones-list/plan-acciones-list.component';
import { PlanSeeComponent } from './plan-see/plan-see.component';
import { AccionesRealizadasListComponent } from './acciones-realizadas-list/acciones-realizadas-list.component';
import { AccionRealizadaAddComponent } from './accion-realizada-add/accion-realizada-add.component';
import { AccionesToPlanListComponent } from './acciones-to-plan-list/acciones-to-plan-list.component';
import { AccionesPListComponent } from './acciones-plist/acciones-plist.component';
import { UploadComponent } from './upload/upload.component';
import { PasswordChangeModalComponent } from './password-change-modal/password-change-modal.component';
import { FullPlanSeeComponent } from './full-plan-see/full-plan-see.component';
import { AccionPlaneadaAddComponent } from './accion-planeada-add/accion-planeada-add.component';
import { PlazoActivacionComponent } from './plazo-activacion/plazo-activacion.component';
import { AperturaGuard } from './services/apertura.guard';
import { DatePipe } from '@angular/common';

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
    LoginComponent,
    PlanAccionesAddComponent,
    PlanAccionesListComponent,
    PlanSeeComponent,
    AccionesRealizadasListComponent,
    AccionRealizadaAddComponent,
    AccionesToPlanListComponent,
    AccionesPListComponent,
    UploadComponent,
    PasswordChangeModalComponent,
    FullPlanSeeComponent,
    AccionPlaneadaAddComponent,
    PlazoActivacionComponent
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
      { path: 'planAdd',canActivate:[AuthGuard], component: PlanAccionesAddComponent },
      { path: 'actForPlanList',canActivate:[AuthGuard], component: AccionesToPlanListComponent },
      { path: 'planSee/:idActividad',canActivate:[AuthGuard], component: PlanSeeComponent },
      { path: 'planList',canActivate:[AuthGuard,AperturaGuard], component: PlanAccionesListComponent },
      { path: 'accionesList/:idPlan',canActivate:[AuthGuard], component: AccionesPListComponent },
      { path: 'fullPlanSee/:idActividad',canActivate:[AuthJefeDptoGuard], component: FullPlanSeeComponent },
      { path: 'ActividadList',canActivate:[AuthJefeDptoGuard], component: ActivityListComponent },
      { path: 'plazoActivacion',canActivate:[AdminGuard], component: PlazoActivacionComponent },

    ])
  ],
    providers: [DocenteService,JefeDepartamentoService,DatePipe],
    entryComponents: [MensajeModalComponent,AccionRealizadaAddComponent,PasswordChangeModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
