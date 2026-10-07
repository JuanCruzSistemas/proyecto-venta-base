import { Injectable } from "@nestjs/common";
import { GestorEntityManager } from "../../../../../../common/infraestructure/typeorm-uow/gestor-entity-manager";

import { Producto } from "../../../../domain/entities/producto.entity";
import { IProductosRepository } from "../../../../domain/repositories/productos.repository.interface";

import { ProductoEntity } from "../entities/producto.orm-entity";
import { ProductoOrmMapper } from "../mappers/producto-orm.mapper";

@Injectable()
export class ProductosRepository implements IProductosRepository {
    constructor(
        private readonly gestor: GestorEntityManager
    ) {}
    
    async create(data: Producto): Promise<Producto> {
        const orm = ProductoOrmMapper.toOrm(data);
        const productoCreated = await this.gestor.actual.save(orm);
        return ProductoOrmMapper.toDomain(productoCreated);
    }
    
    async findAll(activo?: boolean): Promise<Producto[]> {
        const query = this.gestor.actual.createQueryBuilder(ProductoEntity, 'productos');
        if (activo !== undefined) {
            query.where('productos.activo = :activo', { activo });
        }

        const productos = await query.getMany();
        return productos.map(ProductoOrmMapper.toDomain);
    }
    
    async findOneById(id: number): Promise<Producto | null> {
        const producto = await this.gestor.actual.findOneBy(ProductoEntity, { id });
        return producto ? ProductoOrmMapper.toDomain(producto) : null;
    }
    
    async update(data: Producto): Promise<Producto> {
        const orm = ProductoOrmMapper.toOrm(data);
        const productoUpdated = await this.gestor.actual.save(orm);
        return ProductoOrmMapper.toDomain(productoUpdated);
    }
    
    async countByCategoria(categoriaId: number): Promise<number> {
        const count = await this.gestor.actual.count(ProductoEntity, {
            where: { categoriaId }
        });
        return count;
    }

    async existsByNombre(nombre: string): Promise<boolean> {
        return this.gestor.actual.existsBy(ProductoEntity, { nombre });
    }

    async existsById(id: number): Promise<boolean> {
        return this.gestor.actual.existsBy(ProductoEntity, { id });
    }
}