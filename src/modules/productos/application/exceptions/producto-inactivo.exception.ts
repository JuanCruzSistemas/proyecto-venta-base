import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class ProductoInactivoException extends ApplicationException {
    constructor() {
        super(
            'Producto inactivo',
            AppErrorCode.INVALID_INPUT
        );
    }
}
