import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class CategoriaNoEncontrada extends ApplicationException {
    constructor() {
        super(
            'Categoria no encontrada',
            AppErrorCode.NOT_FOUND
        );
    }
}
