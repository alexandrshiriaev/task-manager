import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from '../../users/schemas/user.schema';

export type CustomTagDocument = HydratedDocument<CustomTag>;

@Schema()
export class CustomTag {

  @Prop({required: true})
  value: string;

  @Prop()
  color: string;

  @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

}

export const CustomTagSchema = SchemaFactory.createForClass(CustomTag);