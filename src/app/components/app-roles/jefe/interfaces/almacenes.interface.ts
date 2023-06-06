import { Users } from "./users.interface";

export interface Almacenes {
    direccion: string,
    ciudad: string,
    c_postal:number,
    nombre: string,
    responsable?: Users
}
