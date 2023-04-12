import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskGroup, TaskGroupSchema } from './schemas/task-group.schema';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService],
  imports: [
    MongooseModule.forFeature([
        { name: TaskGroup.name, schema: TaskGroupSchema },
      ],
    ),
  ]
})
export class GroupsModule {}
