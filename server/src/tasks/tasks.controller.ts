import { Controller, Get, Post, Body, Param, Delete, Req, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req, createTaskDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.tasksService.findById(req, id);
  }

  @Put(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(req, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
