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
    CategorieEquipementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NbSelectModule,
    NbThemeModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
