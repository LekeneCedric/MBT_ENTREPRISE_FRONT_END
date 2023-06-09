export interface IRole
{
    id?:number
    intitule?:string
}
export interface IPrivilege
{
    id?:number
    intitule?:string
    name?:string
    module?:string
    role_id?:number,
    roles:[]
}
