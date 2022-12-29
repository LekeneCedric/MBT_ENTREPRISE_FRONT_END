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

const routes: Routes = [
  {
    path:"",component:AgencesComponent
  },
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"agents",component:AgentsComponent
  },
  {
    path:"equipement_agence",component:EquipementAgenceComponent
  },
  {
    path:"agences",component:AgencesComponent
  },
  {
    path:"equipements",component:EquipementsComponent
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
    path:"signIn",component:SignInComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
