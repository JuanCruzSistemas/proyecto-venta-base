import { Module } from "@nestjs/common";

// import { TypeOrmProductosPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/typeorm-productos-persistece.module";
import { ActivateProductoUseCase, DeactivateProductoUseCase, FindAllProductosUseCase, FindOneProductoUseCase } from "./application/use-cases";
import { ProductosFacade } from "./application/facade/productos.facade";
import { ProductosPersistenceModule } from "./infraestructure/persistence/prisma-persistence/prisma-productos-persistence.module";
import { ProductosController } from "./infraestructure/presentation/controllers/productos.controller";
import { ManageProductoModule } from "../../processes/manage-producto/manage-producto.module";
import { PRODUCTOS_APPLICATION_PORT } from "./application/ports/productos-application.port";

@Module({
    imports: [
        // TypeOrmProductosPersistenceModule,
        ProductosPersistenceModule,
        ManageProductoModule
    ],
    providers: [
        FindOneProductoUseCase,
        FindAllProductosUseCase,
        ActivateProductoUseCase,
        DeactivateProductoUseCase,
        ProductosFacade,
        {
            provide: PRODUCTOS_APPLICATION_PORT,
            useClass: ProductosFacade
        }
    ],
    controllers: [
        ProductosController
    ],
    exports: [
        // TypeOrmProductosPersistenceModule,
        ProductosPersistenceModule,
        ProductosFacade,
        PRODUCTOS_APPLICATION_PORT
    ]
})
export class ProductosModule {}
