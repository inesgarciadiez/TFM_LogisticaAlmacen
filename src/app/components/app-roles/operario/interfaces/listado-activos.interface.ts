export interface ListadoActivos {
    referencia?: number,
    estado?: string,
    fecha_salida?: string | null,
    fecha_creacion?: string | null,
    almacen_origen: string,
    almacen_destino: string,
    matricula: string,
    detalles?: string
    comentario_error?: string
}
