import { Categoria } from "../../../../domain/entities/categoria.entity";
import { ICategoriasRepository } from "../../../../domain/repositories/categorias.repository.interface";
import { CategoriaEntity } from "../entities/categoria.orm-entity";
import { CategoriaOrmMappers } from "../mappers/categoria-orm.mapper";
import { GestorEntityManager } from "../../../../../../common/infraestructure/typeorm-uow/gestor-entity-manager";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriasRepository implements ICategoriasRepository {
    constructor(
        private readonly repo: GestorEntityManager
    ) {}
    
    async create(data: Categoria): Promise<Categoria> {
        const orm = CategoriaOrmMappers.toOrm(data);
        const categoriaCreated = await this.repo.actual.save(orm);
        return CategoriaOrmMappers.toDomain(categoriaCreated);
    }
    
    async findOneById(id: number): Promise<Categoria | null> {
        const categoria = await this.repo.actual.findOneBy(CategoriaEntity, { id });
        return categoria ? CategoriaOrmMappers.toDomain(categoria) : null;
    }
    
    async findAll(): Promise<Categoria[]> {
        const categorias = await this.repo.actual.find(CategoriaEntity);
        return categorias.map(CategoriaOrmMappers.toDomain);
    }
    
    async update(data: Categoria): Promise<Categoria> {
        const orm = CategoriaOrmMappers.toOrm(data);
        const categoriaCreated = await this.repo.actual.save(orm);
        return CategoriaOrmMappers.toDomain(categoriaCreated);
    }
    
    async remove(categoria: Categoria): Promise<void> {
        const orm = CategoriaOrmMappers.toOrm(categoria);
        await this.repo.actual.remove(orm);
    }
    
    async existsByNombre(nombre: string): Promise<boolean> {
        return this.repo.actual.existsBy(CategoriaEntity, { nombre });
    }

    async existsById(id: number): Promise<boolean> {
        return this.repo.actual.existsBy(CategoriaEntity, { id });
    }
}