import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

// interface ClassConstructor {
//   new (...args: any[]): {};
// }

// Serialization converts entity class istances to plain objects
// https://docs.nestjs.com/techniques/serialization
// Custom serialize funtion to use as decorator
export function Serialize(dto: any) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

// Intercepters
// https://docs.nestjs.com/interceptors
export class SerializerInterceptor<DTO_TYPE extends ClassConstructor<any>>
  implements NestInterceptor
{
  constructor(private dto: DTO_TYPE) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<DTO_TYPE>,
  ): Observable<DTO_TYPE> | Promise<Observable<DTO_TYPE>> {
    // Run something before a request is handled by the request handler
    // console.log(`SerializerInterceptor reequest context: `, context);

    return handler.handle().pipe<DTO_TYPE>(
      map((data: DTO_TYPE) => {
        // Run somthing before the response is sent out
        // console.log(`SerializerInterceptor response data: `, data);
        return plainToInstance<DTO_TYPE, DTO_TYPE>(this.dto, data, {
          excludeExtraneousValues: true, // only properties that decorated with Expose() exist
        });
      }),
    );
  }
}
