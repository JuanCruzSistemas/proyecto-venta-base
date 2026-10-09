import { Prisma } from "../../../../../../generated/prisma";

import { Categoria as CategoriaPrisma } from "../../../../../../generated/prisma";
import { Categoria } from "../../../../domain/entities/categoria.entity";

export class CategoriaPrismaMapper {
    static toCreateInput(domain: Categoria): Prisma.CategoriaCreateInput {
        return {
            nombre: domain.getNombre(),
            creadoEn: domain.getCreadoEn()
        };
    }

    static toUpdateInput(domain: Categoria): Prisma.CategoriaUpdateInput {
        return {
            nombre: domain.getNombre(),
            creadoEn: domain.getCreadoEn()
        };
    }

    static toDomain(prisma: CategoriaPrisma): Categoria {
        return Categoria.reconstitute({
            id: prisma.id,
            nombre: prisma.nombre,
            creadoEn: prisma.creadoEn
        });
    }
}
