import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './modules/productos/productos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { VentasModule } from './modules/ventas/ventas.module';
import { TypeOrmUnitOfWorkModule } from './common/infraestructure/typeorm-uow/typeorm-uow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmUnitOfWorkModule,
    ProductosModule,
    CategoriasModule,
    VentasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}