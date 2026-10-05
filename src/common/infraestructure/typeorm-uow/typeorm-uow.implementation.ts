import { IUnitOfWork } from "../../application/unit-of-work/unit-of-work.interface";
import { GestorEntityManager } from "./gestor-entity-manager";

export class TypeOrmUnitOfWork implements IUnitOfWork {
    constructor(
        private readonly gestor: GestorEntityManager
    ) {}
    
    async runInTransaction<T>(work: () => Promise<T>): Promise<T> {
        return this.gestor.runInTransaction(work);
    }
}