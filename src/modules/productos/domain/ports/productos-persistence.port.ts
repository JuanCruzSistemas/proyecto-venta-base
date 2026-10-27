import { Producto } from "../entities/producto.entity";

export const PRODUCTOS_PERSISTENCE_PORT = Symbol('ProductosPersistencePort');

export interface ProductosPersistencePort {
    create(data: Producto): Promise<Producto>;
    findAll(activo?: boolean): Promise<Producto[]>;
    findOneById(id: number): Promise<Producto | null>;
    update(data: Producto): Promise<Producto>;
    countByCategoria(categoriaId: number): Promise<number>;
    existsByNombre(nombre: string): Promise<boolean>;
    existsById(id: number): Promise<boolean>;
}
