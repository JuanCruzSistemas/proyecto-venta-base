import { Injectable } from "@nestjs/common";
import { GestorPrismaClient } from "../../../../../../common/infraestructure/prisma-uow/gestor-prisma-client";
import { Producto } from "../../../../domain/entities/producto.entity";
import { IProductosRepository } from "../../../../domain/repositories/productos.repository.interface";
import { ProductoPrismaMapper } from "../mappers/producto-prisma.mapper";

@Injectable()
export class PrismaProductosRepository implements IProductosRepository {
    constructor(
        private readonly gestor: GestorPrismaClient
    ) {}

    async create(data: Producto): Promise<Producto> {
        const productoCreated = await this.gestor.actual.producto.create({
            data: ProductoPrismaMapper.toCreateInput(data),
        });
        return ProductoPrismaMapper.toDomain(productoCreated);
    }

    async findAll(activo?: boolean): Promise<Producto[]> {
        const productos = await this.gestor.actual.producto.findMany({
            where: activo !== undefined ? { activo } : {}
        });
        return productos.map(ProductoPrismaMapper.toDomain);
    }

    async findOneById(id: number): Promise<Producto | null> {
        const producto = await this.gestor.actual.producto.findUnique({
            where: { id }
        });
        return producto ? ProductoPrismaMapper.toDomain(producto) : null;
    }

    async update(data: Producto): Promise<Producto> {
        const productoUpdated = await this.gestor.actual.producto.update({
            where: { id: data.getId()! },
            data: ProductoPrismaMapper.toUpdateInput(data)
        });
        return ProductoPrismaMapper.toDomain(productoUpdated);
    }

    async countByCategoria(categoriaId: number): Promise<number> {
        const count = await this.gestor.actual.producto.count({
            where: { categoriaId }
        })
        return count;
    }

    async existsByNombre(nombre: string): Promise<boolean> {
        const producto = await this.gestor.actual.producto.findUnique({
            where: { nombre },
            select: { id: true }
        });
        return producto !== null;
    }

    async existsById(id: number): Promise<boolean> {
        const producto = await this.gestor.actual.producto.findUnique({
            where: { id },
            select: { id: true }
        });
        return producto !== null;
    }
}
