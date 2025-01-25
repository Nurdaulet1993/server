import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller('messages')
export class MessagesController {

  constructor(
    private messagesService: MessagesService,  // inject MessagesService
  ) {}
  @Get()
  findAll() {
    return ['Hello from MessagesController'];
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log('Received message:', body);
    return body;
  }


  @Get(':id')
  getMessageById(@Param('id', ParseIntPipe) id: number) {
    console.log('Getting message by ID:', id);
  }
}
