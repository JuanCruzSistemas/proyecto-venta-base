import { Categoria } from "../../domain/entities/categoria.entity";
import { CategoriaResponse } from "../responses/categoria.response";

export class CategoriaResponseMapper {
    static toResponse(domain: Categoria): CategoriaResponse {
        return {
            id: domain.getId()!,
            nombre: domain.getNombre(),
            creadoEn: domain.getCreadoEn()
        };
    }
}
