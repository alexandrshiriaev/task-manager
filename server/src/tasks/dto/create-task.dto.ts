export class CreateTaskDto {
  name: string;

  tags?: string[];

  description?: string;

  group?: string;

  users: string[];

  completed: boolean;
}
