export interface ProductoResponse {
    id: number;
    nombre: string;
    precio: number;
    activo: boolean;
    categoriaId: number;
    creadoEn: Date;
}