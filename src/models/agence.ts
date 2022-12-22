import { IEntreprise } from "./entreprise"

export interface Iagence{
    id?: 1,
    entreprise_id: 1,
    nom ?: string,
    localisation?: string,
    code?: string,
    nbremploye?:number,
    nbrequipement?:number,
    nbrfournisseur?:number,
    created_at?: Date,
    updated_at?: Date,
    entreprise?: IEntreprise
}