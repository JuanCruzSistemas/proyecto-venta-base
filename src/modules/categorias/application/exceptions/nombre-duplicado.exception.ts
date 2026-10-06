import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class NombreCategoriaDuplicadoException extends ApplicationException {
    constructor() {
        super(
            'Nombre duplicado para la categoría',
            AppErrorCode.CONFLICT
        );
    }
}
