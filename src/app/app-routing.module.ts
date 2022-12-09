import { AgencesComponent } from './components/agences/agences.component';
import { PlanMaintenanceComponent } from './components/plan-maintenance/plan-maintenance.component';
import { FournisseursComponent } from './components/fournisseurs/fournisseurs.component';
import { EquipementsComponent } from './components/equipements/equipements.component';
import { AgentsComponent } from './components/agents/agents.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"dashboard",component:DashboardComponent
  },
  {
    path:"agents",component:AgentsComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
