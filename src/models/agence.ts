import { IEntreprise } from "./entreprise"

export interface Iagence{
    id?: number,
    entreprise_id ?: number,
    nom ?: string,
    localisation?: string,
    nbremploye?:number,
    nbrequipement?:number,
    nbrfournisseur?:number,
    created_at?: Date,
    updated_at?: Date,
    entreprise?: IEntreprise,
    longitude?:number,
    latitude?:number 
}