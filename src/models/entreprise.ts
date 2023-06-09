export interface IEntreprise {
    id?: number,
    user_id?:number,
    nom?: string,
    code?: string,
    type?: string,
    type_entreprise?: string,
    email?: string,
    tel?: number,
    adresse?: string
    description?: string,
    message?:string,
    domaine?: string,
    created_at?: Date,
    updated_at?: Date
}
