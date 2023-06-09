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
    periodicite?:string,
    designation?:string,
    specialite?:string,
    description?:string,
    media?:any[],
    longitude?:number,
    latitude?:number,
    isLink?:boolean
}
