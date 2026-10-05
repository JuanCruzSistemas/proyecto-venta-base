export class DetalleVenta {
    constructor(
        private id: number | null,
        private ventaId: number,
        private productoId: number,
        private cantidad: number,
        private precioUnitario: number,
        private subtotal: number
    ) {}
}