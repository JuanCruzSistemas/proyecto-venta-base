import { IsBoolean, IsOptional } from "class-validator";

export class FiltroActivoDto {
    @IsOptional()
    @IsBoolean()
    activo?: boolean;
}
