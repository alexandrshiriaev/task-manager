import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CustomTag } from './schemas/custom-tag.schema';
import { UsersService } from '../users/users.service';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(CustomTag.name) private customTagModel: Model<CustomTag>,
    private groupService: GroupsService,
    private userService: UsersService,
  ) {
  }

  async create(req, createTaskDto: CreateTaskDto) {
    const userId = req['user'].sub;
    const author = this.userService.findById(userId);
    const usersArr = createTaskDto.users || [];
    if (!usersArr.includes(userId)) usersArr.push(userId);

    const users = await Promise.all(usersArr.map(async userId => await this.userService.findById(userId)));
    const group = this.groupService.findById(createTaskDto.group);
    const tags = this.findTagsById(createTaskDto.tags);

    if (!users.includes(userId)) users.push(userId);
    const task = await this.taskModel.create({
      name: createTaskDto.name,
      tags: tags,
      group: group,
      author: author,
      description: createTaskDto.description || null,
      users: users,
      completed: createTaskDto.completed || false,
    });

    await this.userService.addTaskToUser(userId, task);

    return task;
  }

  async findAll(req) {
    const user = await this.userService.findById(req['user'].sub);
    return user.tasks;
  }

  async findWithoutGroup(req) {
    const user = await this.userService.findById(req['user'].sub);
    const tasks = user.tasks.filter(task => task.group === null);
    return tasks;
  }

  async findById(req, id) {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async update(req, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findById(req, id);
    const user = await this.userService.parseByReq(req);
    if (user.id !== task.author.toString()) throw new UnauthorizedException;
    task.name = updateTaskDto.name || task.name;
    if (updateTaskDto.group) {
      const group = await this.groupService.findById(updateTaskDto.group);
      task.group = group;
    }
    if (updateTaskDto.tags) {
      const tags = await this.findTagsById(updateTaskDto.tags);
      task.tags = tags;
    }
    if (updateTaskDto.users) {
      if (!updateTaskDto.users.includes(user.id)) updateTaskDto.users.push(user.id);
      const users = await Promise.all(updateTaskDto.users.map(async user => await this.userService.findById(user)));
      task.users = users;
    }
    task.description = updateTaskDto.description || task.description;
    task.completed = updateTaskDto.completed || task.completed;

    await task.save();
    return task;

  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async findTagsById(ids: string[]) {
    if (!ids || !ids.length) return [];

    const tags = [];

    await Promise.all(ids.map(async id => {
      const tag = await this.customTagModel.findById(id);
      tags.push(tag);
    }));

    return tags;
  }

}
