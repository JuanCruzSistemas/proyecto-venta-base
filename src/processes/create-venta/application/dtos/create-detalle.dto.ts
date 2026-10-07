import { IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateDetalleDto {
    @IsInt()
    @IsPositive()
    productoId!: number;

    @IsNumber()
    @IsPositive()
    cantidad!: number;
}