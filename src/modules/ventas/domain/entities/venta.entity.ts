export class Venta {
    constructor(
        private id: number | null,
        private fecha: Date = new Date(),
        private total: number
    ) {}
}