import { CantidadInvalidaException } from "../exceptions/cantidad-invalida.exception";

export class Cantidad {
    private constructor(
        private readonly value: number
    ) {}

    public static create(value: number): Cantidad {
        this.validate(value);
        return new Cantidad(value);
    }

    private static validate(value: number): void {
        if (value <= 0) {
            throw new CantidadInvalidaException();
        }
    }

    public getValue(): number {
        return this.value;
    }
}