import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Task } from '../../tasks/schemas/task.schema';
import { CustomTag } from '../../tasks/schemas/custom-tag.schema';

export type TaskGroupDocument = HydratedDocument<TaskGroup>;

@Schema()
export class TaskGroup {

  @Prop({required: true})
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, type:mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop()
  color: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomTag' }] })
  tags: CustomTag[];

}

export const TaskGroupSchema = SchemaFactory.createForClass(TaskGroup);