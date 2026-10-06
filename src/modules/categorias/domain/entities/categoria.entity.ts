import { NombreInvalidoException } from "../exceptions/nombre-invalido.exception";
import { CreateCategoriaInput } from "../inputs/create-categoria.interface";
import { ReconstituteCategoriaInput } from "../inputs/reconstitute-categoria.interface";

export class Categoria {
    private constructor(
        private id: number | null,
        private nombre: string,
        private creadoEn: Date = new Date()
    ) {}

    public static create(data: CreateCategoriaInput): Categoria {
        this.validate(data.nombre);
        return new Categoria(
            null,
            data.nombre
        );
    }

    public static reconstitute(data: ReconstituteCategoriaInput): Categoria {
        return new Categoria(
            data.id,
            data.nombre,
            data.creadoEn
        );
    }

    private static validate(nombre: string): void {
        if (!nombre || !nombre.trim()) {
            throw new NombreInvalidoException();
        }
    }

    public cambiarNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getId(): number | null {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getCreadoEn(): Date {
        return this.creadoEn;
    }
}