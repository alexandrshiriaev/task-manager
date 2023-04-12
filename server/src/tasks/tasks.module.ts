import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { CustomTag, CustomTagSchema } from './schemas/custom-tag.schema';
import { UsersModule } from '../users/users.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([
        { name: Task.name, schema: TaskSchema },
        { name: CustomTag.name, schema: CustomTagSchema },
      ],
    ),
    UsersModule,
    GroupsModule
  ],
})
export class TasksModule {
}
