import { Iagence } from './agence';
import { Iequipement } from './equipement';
export interface IPossessionEquipement{
    id?:number,
    id_entreprise?:number,
    id_equipement?:number,
    id_agence?:number,
    id_salle?:number,
    id_fournisseur?:number,
    position?:string,
    etat?:string,
    equipement?:Iequipement,
    agence?:Iagence,
    created_at?:Date,
    updated_at?:Date
}