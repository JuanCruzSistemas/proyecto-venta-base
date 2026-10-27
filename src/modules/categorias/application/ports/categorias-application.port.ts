import { CreateCategoriaDto, UpdateCategoriaDto } from "../dtos";
import { CategoriaResponse } from "../responses/categoria.response";

export const CATEGORIAS_APPLICATION_PORT = Symbol('CategoriasApplicationPort');

export interface CategoriasApplicationPort {
    create(dto: CreateCategoriaDto): Promise<CategoriaResponse>;
    findOne(id: number): Promise<CategoriaResponse>;
    findAll(): Promise<CategoriaResponse[]>;
    update(id: number, dto: UpdateCategoriaDto): Promise<CategoriaResponse>;
}
