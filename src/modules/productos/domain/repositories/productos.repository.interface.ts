import { Producto } from "../entities/producto.entity";

export const PRODUCTOS_REPOSITORY_TOKEN = Symbol('IProductosRepository');

export interface IProductosRepository {
    create(data: Producto): Promise<Producto>;
    findAll(activo?: boolean): Promise<Producto[]>;
    findOneById(id: number): Promise<Producto | null>;
    update(data: Producto): Promise<Producto>;
    countByCategoria(categoriaId: number): Promise<number>;
}
