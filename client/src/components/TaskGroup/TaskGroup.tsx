import React, {FC} from 'react';
import {ITask} from "../../types/ITask";
import Task from "../Task/Task";

import {Card, Space} from "antd";
import Paragraph from "antd/es/typography/Paragraph";

interface TaskGroupProps {
    name: string;
    groupColor?: string;
    tasks: ITask[];
}

const TaskGroup: FC<TaskGroupProps> = ({name, groupColor, tasks}) => {
    return (
        <Card title={name}>
            <Space size={"middle"} direction={"vertical"} style={{width: "100%"}}>
                {tasks.length
                    ? tasks.map(task => <Task key={task.id} id={task.id} name={task.name} description={task.description} completed={task.completed}/>)
                    : <Paragraph>На данный момент в этой группе нет задач.</Paragraph>
                }
            </Space>
        </Card>
    );
};

export default TaskGroup;