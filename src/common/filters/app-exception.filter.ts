import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { AppException } from "../exceptions/app-exception";
import type { Response } from 'express';
import { STATUS_BY_CODE } from "./status-by-code";

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: AppException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const status = STATUS_BY_CODE[exception.code] ?? 500;

        response.status(status).json({
            message: exception.message,
            statusCode: status
        });
    }
}