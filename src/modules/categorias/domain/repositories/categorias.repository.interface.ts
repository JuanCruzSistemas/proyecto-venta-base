import { Categoria } from "../entities/categoria.entity";

export const CATEGORIAS_REPOSITORY = Symbol('ICategoriasRepository');

export interface ICategoriasRepository {
    create(data: Categoria): Promise<Categoria>;
    findOneById(id: number): Promise<Categoria | null>;
    findAll(): Promise<Categoria[]>;
    update(data: Categoria): Promise<Categoria>;
    remove(categoria: Categoria): Promise<void>;
    existsByNombre(nombre: string): Promise<boolean>;
    existsById(id: number): Promise<boolean>;
}
