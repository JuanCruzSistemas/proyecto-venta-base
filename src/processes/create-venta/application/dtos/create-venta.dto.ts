
import { Type } from 'class-transformer';
import { CreateDetalleDto } from "./create-detalle.dto";
import { IsArray, ValidateNested } from 'class-validator';

export class CreateVentaDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleDto)
    detalles!: CreateDetalleDto[];
}
