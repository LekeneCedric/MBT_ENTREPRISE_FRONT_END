import { IFournisseur } from './fournisseur';
import { IPossessionEquipement } from './possessionEquipement';
import { Iagence } from './agence';
import { Isalle } from './salle';
export interface INotification{
    id?:number,
    id_salle?:number,
    id_agence?:number,
    id_possessionEquipement?:number,
    deniere_notification?:Date,
    temps_notification?:Date,
    retard?:any,
    salle?:Isalle,
    agence?:Iagence,
    possession_equipement?:IPossessionEquipement,
    fournisseur?:IFournisseur

}