import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class CategoriaConProductosAsociadosException extends ApplicationException {
    constructor() {
        super(
            'No se puede eliminar la categoría por tener productos asociados',
            AppErrorCode.CONFLICT
        );
    }
}
