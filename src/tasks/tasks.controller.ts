import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { User } from "../users/entities/user.entity";
import { GetUser } from "../auth/get-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.gurad";
import { Serialize } from "../interceptors/serialize/serialize.interceptor";
import { TaskDto } from "./dto/task.dto";
import { GetTasksDto } from "./dto/get-tasks.dto";
import { Role } from "../auth/enums/role.enum";
import { Roles } from "../auth/decorators/role.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @UseGuards(JwtAuthGuard)
  @Serialize(TaskDto)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findAll(@Query() query: GetTasksDto) {
    return this.tasksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  // @SetMetadata('role', [Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    console.log('Test', user)
    return this.tasksService.remove(+id);
  }
}
