import { Almacenes } from "./almacenes.interface"

export interface UsersMostrar {
    nombre: string,
    rol:string,
    email:string,
    contraseña:string
    almacen?: Almacenes
}
