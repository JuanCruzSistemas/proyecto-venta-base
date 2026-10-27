import { CategoriaResponse } from "../../../modules/categorias/application/responses/categoria.response";

export const DELETE_CATEGORIA_PORT = Symbol('DeleteCategoriaPort');

export interface DeleteCategoriaPort {
    delete(id: number): Promise<CategoriaResponse>;
}
