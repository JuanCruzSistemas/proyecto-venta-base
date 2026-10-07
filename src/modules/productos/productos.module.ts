import { Module } from "@nestjs/common";

import { ProductosPersistenceModule } from "./infraestructure/persistence/typeorm-persistence/productos-persistece.module";
import { ActivateProductoUseCase, DeactivateProductoUseCase, FindAllProductosUseCase, FindOneProductoUseCase } from "./application/use-cases";
import { ProductosFacade } from "./application/facade/productos.facade";

@Module({
    imports: [
        ProductosPersistenceModule
    ],
    providers: [
        FindOneProductoUseCase,
        FindAllProductosUseCase,
        ActivateProductoUseCase,
        DeactivateProductoUseCase,
        ProductosFacade
    ],
    exports: [
        ProductosPersistenceModule,
        ProductosFacade
    ]
})
export class ProductosModule {}