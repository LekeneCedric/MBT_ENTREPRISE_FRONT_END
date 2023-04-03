import { RappelsMaintenanceComponent } from './components/rappels-maintenance/rappels-maintenance.component';
import { LinkEquipementToSalleComponent } from './components/link-equipement-to-salle/link-equipement-to-salle.component';
import { SubequipementsComponent } from './components/subequipements/subequipements.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { SalleComponent } from './components/salle/salle.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { EquipementAgenceComponent } from './components/equipement-agence/equipement-agence.component';
import { CategorieEquipementComponent } from './components/categorie-equipement/categorie-equipement.component';
import { AgencesComponent } from './components/agences/agences.component';
import { PlanMaintenanceComponent } from './components/plan-maintenance/plan-maintenance.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { EquipementsComponent } from './components/equipements/equipements.component';
import { AgentsComponent } from './components/agents/agents.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MappingComponent } from './components/mapping/mapping.component';
import { HistoriquesMaintComponent } from './components/historiques-maint/historiques-maint.component';
import { DetailsAgentComponent } from './components/details-agent/details-agent.component';

const routes: Routes = [
  {
    path:"",component:AgencesComponent
  },
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"agents",component:AgentsComponent,
  },
  {
    path:"details_agent/:id",component:DetailsAgentComponent
  },
  {
    path:"equipement_agence",component:EquipementAgenceComponent
  },
  {
    path:"liste_maintenance_eq/:id_possession/:id_salle",component:HistoriquesMaintComponent
  },
  {
    path:"agences",component:AgencesComponent
  },
  {
    path:"salles",component:SalleComponent,
    
  },
  {
    path:"rappelMaintenance",component:RappelsMaintenanceComponent
  },
  {
    path:"linkEqToSalle/:id",component:LinkEquipementToSalleComponent
  },
  {
    path:"equipements",component:EquipementsComponent
  },
  {
    path:"equipements/sub/:id",component:SubequipementsComponent
  },
  {
    path:"fournisseurs",component:FournisseursComponent
  },
  {
    path:"plan_maintenance",component:PlanMaintenanceComponent
  },
  {
    path:"categorie_equipement",component:CategorieEquipementComponent
  },
  {
    path:"plan_maintenance",component:PlanMaintenanceComponent
  },
  {
    path:"map",component:MappingComponent
  },
  {
    path:"parametres",component:ParametresComponent
  },
  {
    path:"signIn",component:SignInComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
