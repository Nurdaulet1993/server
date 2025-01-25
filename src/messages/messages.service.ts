import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  findById(id: number) {}
  findAll() {}

  create(content: string): object {
    return { content };
  }


}
