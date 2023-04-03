import { Iagence } from "./agence";

export interface IAgent{
    id?:number,
    nom?:string,
    pseudo?:string,
    telephone?:string,
    email?:string,
    specialite?:string,
    id_agence?:number,
    created_at?:Date,
    updated_at?:Date,
    agence?:Iagence,
    password?:string
}