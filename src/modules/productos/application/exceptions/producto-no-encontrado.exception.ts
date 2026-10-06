import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class ProductoNoEncontradoException extends ApplicationException {
    constructor() {
        super(
            'Producto no encontrado',
            AppErrorCode.NOT_FOUND
        );
    }
}
