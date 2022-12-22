import { ICategorie } from 'src/models/categorie';
export interface Iequipement {

    id?:number,
    id_parent?:number,
    id_output?:number,
    idcategorie?:number,
    categorie?:ICategorie,
    element?:string,
    operation?:string,
    chargePrevue?:string,
    periodicite?:string,
    outillage?:string,
    condi_syste?:string,
    designation?:string,
    gamme_maintenance?:string,
    specialite?:string 
}