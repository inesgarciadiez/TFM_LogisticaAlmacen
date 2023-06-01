
import { Almacenes } from "./almacenes.interface"

export interface Users {
    nombre: string,
    apellido:string,
    rol_id: number,
    email:string,
    contraseña:string
    almacen?: Almacenes
}
