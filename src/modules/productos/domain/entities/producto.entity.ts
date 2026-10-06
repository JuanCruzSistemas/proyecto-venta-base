import { Precio } from "../value-objects/precio.vo";

export class Producto {
    constructor(
        private id: number | null,
        private nombre: string,
        private precio: Precio,
        private categoriaId: number,
        private activo: boolean = true,
        private creadoEn: Date = new Date(),
    ) {}

    public activar(): void {
        this.activo = true;
    }

    public desactivar(): void {
        this.activo = false;
    }

    public getId(): number | null {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecio(): number {
        return this.precio.getValue();
    }

    public estaActivo(): boolean {
        return this.activo;
    }

    public getCreadoEn(): Date {
        return this.creadoEn;
    }

    public getCategoriaId(): number {
        return this.categoriaId;
    }
}