import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from '../../users/schemas/user.schema';
import { CustomTag } from './custom-tag.schema';
import { TaskGroup } from '../../groups/schemas/task-group.schema';


export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

  @Prop({required: true})
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TaskGroup' })
  group: TaskGroup;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomTag' }] })
  tags: CustomTag[];

  @Prop()
  completed: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(Task);