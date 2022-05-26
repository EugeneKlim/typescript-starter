import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundExceptionForService extends HttpException {
    constructor(id) {
        super(`news with id: ${id}, not found`, HttpStatus.NOT_FOUND);
    }
}