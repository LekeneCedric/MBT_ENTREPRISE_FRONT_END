import { IEntreprise } from './entreprise';
import { Iagence } from './agence';
export interface Isalle
{
    id?:number,
    agence?:Iagence,
    entreprise?:IEntreprise,
    id_entreprise?:number,
    id_agence?:number,
    nom?:string,
    tel?:string,
    nbequipements?:number,
    indication?:string,
    description?:string
}