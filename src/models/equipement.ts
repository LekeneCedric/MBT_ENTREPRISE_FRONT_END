import { ICategorie } from 'src/models/categorie';
export interface Iequipement {

    id?:number,
    id_entreprise?:number,
    id_parent?:number,
    parent?:Iequipement,
    child?:Iequipement,
    id_output?:number,
    idcategorie?:number,
    categorie?:ICategorie,
    element?:string,
    period_is_for_child?:string,
    // operation?:string,
    // chargePrevue?:string,
    periodicite?:string,
    // outillage?:string,
    // condi_syste?:string,
    designation?:string,
    // gamme_maintenance?:string,
    specialite?:string,
    description?:string,
    longitude?:number,
    latitude?:number,
    isLink?:boolean
}