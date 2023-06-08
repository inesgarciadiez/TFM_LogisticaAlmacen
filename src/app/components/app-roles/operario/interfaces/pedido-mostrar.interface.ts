import { ListadoActivos } from "./listado-activos.interface"

export interface PedidoMostrar {
    referencia: number,
    estado:string,
    fecha_salida:string,
    almacen_origen:string,
    almacen_destino: string,
    matricula: string
}
