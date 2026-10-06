import { ApplicationException } from "../../../../common/application/exceptions/application-exception";
import { AppErrorCode } from "../../../../common/exceptions/app-error-code.enum";

export class VentaNoEncontradaException extends ApplicationException {
    constructor() {
        super(
            'Venta no encontrada',
            AppErrorCode.NOT_FOUND
        );
    }
}
