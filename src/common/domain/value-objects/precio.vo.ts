import { PrecioInvalidoException } from "../exceptions/precio-invalido.exception";

export class Precio {
    private constructor(
        private readonly value: number
    ) {}

    public static create(value: number): Precio {
        this.validate(value);
        return new Precio(value);
    }

    private static validate(value: number): void {
        if (value < 0) {
            throw new PrecioInvalidoException();
        }
    }

    public getValue(): number {
        return this.value;
    }
}