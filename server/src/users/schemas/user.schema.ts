import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Task } from '../../tasks/schemas/task.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: true})
  username: string;

  @Prop({required: true})
  email: string;

  @Prop({required: true})
  hashed_password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskGroup' }] })
  taskGroups: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User)