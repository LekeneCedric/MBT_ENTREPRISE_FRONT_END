import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbSelectModule, NbThemeModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomthemeComponent } from './customtheme/customtheme.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgentsComponent } from './components/agents/agents.component';
import { EquipementsComponent } from './components/equipements/equipements.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { PlanMaintenanceComponent } from './components/plan-maintenance/plan-maintenance.component';
import { AgencesComponent } from './components/agences/agences.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorieEquipementComponent } from './components/categorie-equipement/categorie-equipement.component';
import { EquipementAgenceComponent } from './components/equipement-agence/equipement-agence.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SalleComponent } from './components/salle/salle.component';
import { SpreadSheetsModule } from '@grapecity/spread-sheets-angular';
import { ParametresComponent } from './components/parametres/parametres.component';
import { SubequipementsComponent } from './components/subequipements/subequipements.component';
import { LinkEquipementToSalleComponent } from './components/link-equipement-to-salle/link-equipement-to-salle.component';
import { RappelsMaintenanceComponent } from './components/rappels-maintenance/rappels-maintenance.component';
import { HistoriquesMaintComponent } from './components/historiques-maint/historiques-maint.component';
import { DetailsAgentComponent } from './components/details-agent/details-agent.component';
@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    NavbarComponent,
    CustomthemeComponent,
    DashboardComponent,
    AgentsComponent,
    EquipementsComponent,
    FournisseursComponent,
    PlanMaintenanceComponent,
    AgencesComponent,
    CategorieEquipementComponent,
    EquipementAgenceComponent,
    SignInComponent,
    MappingComponent,
    SalleComponent,
    ParametresComponent,
    SubequipementsComponent,
    LinkEquipementToSalleComponent,
    RappelsMaintenanceComponent,
    HistoriquesMaintComponent,
    DetailsAgentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    NbThemeModule.forRoot(),
    GoogleMapsModule,
    SpreadSheetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
