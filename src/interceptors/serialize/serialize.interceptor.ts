import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new (...args: any[]): {}
}

// New decorator for serializing
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('serialize', context);
    return next.handle()
      .pipe(
        map((data: any) => {
          return plainToClass(this.dto, data, { excludeExtraneousValues: true });
        })  // Convert id to string
      )
  }
}
