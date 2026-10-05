export class Producto {
    constructor(
        private id: number | null,
        private nombre: string,
        private precio: number,
        private activo: boolean = true,
        private creadoEn: Date = new Date(),
        private categoriaId: number
    ) {}
}