import { Categoria } from "../entities/categoria.entity";

export const CATEGORIAS_PERSISTENCE_PORT = Symbol('CategoriasPersistencePort');

export interface CategoriasPersistencePort {
    create(data: Categoria): Promise<Categoria>;
    findOneById(id: number): Promise<Categoria | null>;
    findAll(): Promise<Categoria[]>;
    update(data: Categoria): Promise<Categoria>;
    remove(categoria: Categoria): Promise<void>;
    existsByNombre(nombre: string): Promise<boolean>;
    existsById(id: number): Promise<boolean>;
}
