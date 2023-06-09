import { Iequipement } from './equipement';
import { IAgent } from 'src/models/agent';
import { IPossessionEquipement } from './possessionEquipement';
export interface Imaintenance
{

    id?: number,
    id_entreprise?:number,
    id_agence?:number,
    id_agent?: number,
    id_possession?: number,
    id_salle?: number,
    id_equipement?: number,
    operation?: string,
    outillage?:string,
    equipement?:Iequipement,
    charge?: String,
    etat?: string,
    condi_syste?: string,
    gamme_maintenance?: string,
    possession?: IPossessionEquipement,
    agent?: IAgent,
    created_at?: Date,
    updated_at?: Date,
    statut?:number
}
