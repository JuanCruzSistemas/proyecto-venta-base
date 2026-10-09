import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class FiltroActivoDto {
    @IsOptional()
    @Transform(({ obj }) => {
        if (obj.activo === undefined) return undefined;
        if (obj.activo === 'true') return true;
        if (obj.activo === 'false') return false;
        return obj.activo;
    })
    @IsBoolean()
    activo?: boolean;
}