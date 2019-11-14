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
    JefeEditComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  ,
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'docenteAdd', component: DocenteAddComponent },
      { path: 'docenteList', component: DocenteListComponent },
      { path: 'ActivityAdd', component: ComplementaryActivityAddComponent },
      { path: 'docenteEdit/:id', component: DocenteEditComponent },
      { path: 'jefeAdd', component: JefeAddComponent },
      { path: 'jefeList', component: JefeListComponent },
      { path: 'jefeEdit/:id', component: JefeEditComponent },
    ])
  ],
    providers: [],
    entryComponents: [MensajeModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
