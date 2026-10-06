import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class NombreProductoDuplicadoException extends ApplicationException {
    constructor() {
        super(
            'Nombre de producto duplicado',
            AppErrorCode.CONFLICT
        );
    }
}
