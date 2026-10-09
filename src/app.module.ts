import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './modules/productos/productos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { VentasModule } from './modules/ventas/ventas.module';
// import { TypeOrmUnitOfWorkModule } from './common/infraestructure/typeorm-uow/typeorm-uow.module';
import { ManageProductoModule } from './processes/manage-producto/manage-producto.module';
import { CreateVentaModule } from './processes/create-venta/create-venta.module';
import { DeleteCategoriaModule } from './processes/delete-categoria/delete-categoria.module';
import { PrismaUnitOfWorkModule } from './common/infraestructure/prisma-uow/prisma-uow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'postgres',
    //     host: config.get<string>('HOST'),
    //     port: config.get<number>('POSTGRES_PORT'),
    //     username: config.get<string>('POSTGRES_USER'),
    //     password: config.get<string>('POSTGRES_PASSWORD'),
    //     database: config.get<string>('POSTGRES_DB'),
    //     entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
    //     synchronize: true,
    //   }),
    // }),
    // TypeOrmUnitOfWorkModule,
    PrismaUnitOfWorkModule,
    ProductosModule,
    CategoriasModule,
    VentasModule,
    ManageProductoModule,
    DeleteCategoriaModule,
    CreateVentaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}