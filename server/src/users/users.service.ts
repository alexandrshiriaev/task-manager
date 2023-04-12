import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({email});
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async addTaskToUser(id, task) {
    const user = await this.findById(id);
    user.tasks.push(task);
    await user.save();
    return user;
  }

  async addGroupToUser(id, group) {
    const user = await this.findById(id);
    user.taskGroups.push(group);
    await user.save();
    return user;
  }

  async parseByReq(req) {
    return await this.findById(req['user'].sub);
  }
}
