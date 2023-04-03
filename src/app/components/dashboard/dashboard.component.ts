import { Imaintenance } from 'src/models/maintenance';
import { MaintenanceService } from 'src/services/maintenance.service';
import { Ilog } from './../../../models/log';
import { LogService } from './../../../services/log.service';
import { Istatistic } from './../../../models/statistic';
import { StatisticsService } from './../../../services/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
constructor(
private maintenanceServ:MaintenanceService,
private statisticServ:StatisticsService,
private logServ : LogService,
){}
private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
public statistics : Istatistic = {};
public logs : Ilog[] = [];
public periode : number = 0 ;
public maintenances : Imaintenance[] = [];
/* Periode : {
  0 => aujourd'hui
  1 => cette semaine
  2 => ce mois
} */
ngOnInit(): void {
    this.maintenanceServ.getMaintenanceByEntreprise(this.entreprise_id).subscribe((data)=>
    {
      this.maintenances = data;
      this.maintenances.length = 10;
    })
    this.statisticServ.getStatistic().subscribe(
      (data)=>
      {
        this.statistics = data;
      }
    );
    this.logServ.getLogs().subscribe(
      (data)=>
      {
        this.logs = data;
      }
    );
}
get periodeStr():string{
  return  this.periode == 0 ? "Aujourd'hui" : (this.periode == 1 ? "Cette semaine" : "Ce mois");
}
changePeriode(i : number )
{
  this.periode = i;
}
}
