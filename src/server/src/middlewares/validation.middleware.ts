import { HttpException } from '@/exceptions/HttpException';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */

export const ValidationMiddleware = (
  type: any,
  source: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false, // Bỏ qua các thuộc tính không có trong DTO
  whitelist = false, // Bỏ qua các thuộc tính không có trong DTO
  forbidNonWhitelisted = false, // Nếu true, sẽ trả về lỗi nếu có thuộc tính không có trong DTO
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source]; // Lấy đúng phần cần validate
    const dto = plainToInstance(type, data);

    validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then(() => {
        req[source] = dto; // Gán lại dto đã transform vào request
        next();
      })
      .catch((errors: ValidationError[]) => {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints || {}).join(', ')).join(', ');
        next(new HttpException(400, message));
      });
  };
};
