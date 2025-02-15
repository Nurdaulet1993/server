import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { GetTasksDto } from "./dto/get-tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>
  ) {}

  create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.taskRepo.create(createTaskDto);
    task.user = user;


    return this.taskRepo.save(task);
  }

  findAll({ title, description }: GetTasksDto) {
    return this.taskRepo.createQueryBuilder()
      .select('*')
      .where('title = :title', { title })
      .andWhere('description = :description', { description })
      .limit(3)
      .getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
