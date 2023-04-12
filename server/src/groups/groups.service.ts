import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskGroup } from './schemas/task-group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(TaskGroup.name) private taskGroupModel: Model<TaskGroup>
  ) {
  }
  async findById(id: string) {
        const group = await this.taskGroupModel.findById(id);
        return group;
  }
}
