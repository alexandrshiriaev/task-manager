import React, {FC, SetStateAction} from 'react';
import {Button, Checkbox, Space, Tooltip} from "antd";
import {deleteTask} from "../../store/reducers/TasksSlice";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useAppDispatch} from "../../store/hooks";
import {CheckboxChangeEvent} from "antd/es/checkbox";

interface TaskButtonsProps {
    taskId: number;
    isCompleted: boolean;
    onChecked: (e: CheckboxChangeEvent) => void;
    setIsEditing: React.Dispatch<SetStateAction<boolean>>;
    isEditing: boolean;
}

const TaskButtons: FC<TaskButtonsProps> = ({taskId, setIsEditing, isEditing, isCompleted, onChecked}) => {

    const dispatch = useAppDispatch()

    return (
        <Space wrap>
            <Tooltip title="Удалить">
                <Button onClick={(e) => dispatch(deleteTask({id: taskId}))} style={{margin: 0, padding: 0}} type="link" danger>
                    <DeleteOutlined />
                </Button>
            </Tooltip>
            <Tooltip title="Изменить">
                <Button onClick={(e) => setIsEditing(!isEditing)} style={{margin: 0, padding: 0}}  type="link">
                    <EditOutlined />
                </Button>
            </Tooltip>
            <Tooltip title="Отметить выполненным">
                <Checkbox onChange={onChecked} checked={isCompleted}></Checkbox>
            </Tooltip>
        </Space>
    );
};

export default TaskButtons;