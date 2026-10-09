import { Module } from "@nestjs/common";

// import { TypeOrmProductosPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/typeorm-productos-persistece.module";
import { ActivateProductoUseCase, DeactivateProductoUseCase, FindAllProductosUseCase, FindOneProductoUseCase } from "./application/use-cases";
import { ProductosFacade } from "./application/facade/productos.facade";
import { PrismaProductosPersistenceModule } from "./infraestructure/persistence/prisma-persistence/prisma-productos-persistence.module";

@Module({
    imports: [
        // TypeOrmProductosPersistenceModule,
        PrismaProductosPersistenceModule
    ],
    providers: [
        FindOneProductoUseCase,
        FindAllProductosUseCase,
        ActivateProductoUseCase,
        DeactivateProductoUseCase,
        ProductosFacade
    ],
    exports: [
        // TypeOrmProductosPersistenceModule,
        PrismaProductosPersistenceModule,
        ProductosFacade
    ]
})
export class ProductosModule {}