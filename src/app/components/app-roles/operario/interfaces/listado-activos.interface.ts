export interface ListadoActivos {
    referencia?: number,
    estado?: string,
    //nuevoEstado: string,
    fecha_salida: string | null,
    almacen_origen: string,
    almacen_destino: string,
    matricula: string,
    detalles?: string
    comentario_error?: string
}
