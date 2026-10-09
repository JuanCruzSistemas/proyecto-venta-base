import { Injectable } from "@nestjs/common";

import { GestorPrismaClient } from "../../../../../../common/infraestructure/prisma-uow/gestor-prisma-client";

import { ICategoriasRepository } from "../../../../domain/repositories/categorias.repository.interface";
import { Categoria } from "../../../../domain/entities/categoria.entity";

import { CategoriaPrismaMapper } from "../mappers/categorias-prisma.mapper";

@Injectable()
export class CategoriasRepository implements ICategoriasRepository {
    constructor(
        private readonly gestor: GestorPrismaClient
    ) {}

    async create(data: Categoria): Promise<Categoria> {
        const categoriaCreated = await this.gestor.actual.categoria.create({
            data: CategoriaPrismaMapper.toCreateInput(data)
        });
        return CategoriaPrismaMapper.toDomain(categoriaCreated);
    }
    
    async findOneById(id: number): Promise<Categoria | null> {
        const categoria = await this.gestor.actual.categoria.findUnique({
            where: { id }
        });
        return categoria ? CategoriaPrismaMapper.toDomain(categoria) : null;
    }

    async findAll(): Promise<Categoria[]> {
        const categorias = await this.gestor.actual.categoria.findMany();
        return categorias.map(CategoriaPrismaMapper.toDomain);
    }
    
    async update(data: Categoria): Promise<Categoria> {
        const categoriaUpdated = await this.gestor.actual.categoria.update({
            where: { id: data.getId()! },
            data: CategoriaPrismaMapper.toUpdateInput(data)
        });
        return CategoriaPrismaMapper.toDomain(categoriaUpdated);
    }

    async remove(categoria: Categoria): Promise<void> {
        await this.gestor.actual.categoria.delete({
            where: { id: categoria.getId()! }
        });
    }
    
    async existsByNombre(nombre: string): Promise<boolean> {
        const categoria = await this.gestor.actual.categoria.findUnique({
            where: { nombre },
            select: { id: true }
        });
        return categoria !== null;
    }

    async existsById(id: number): Promise<boolean> {
        const categoria = await this.gestor.actual.categoria.findUnique({
            where: { id },
            select: { id: true }
        });
        return categoria !== null;
    }
}
