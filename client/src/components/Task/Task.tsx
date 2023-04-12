import React, {FC, useState} from 'react';

import {Button, Card, Row, theme} from "antd";
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import {useAppDispatch} from "../../store/hooks";
import {changeTask, setCompleted} from "../../store/reducers/TasksSlice";
import Paragraph from 'antd/es/typography/Paragraph';
import TaskButtons from "./TaskButtons";

interface TaskProps {
    id: number;
    name: string;
    description?: string;
    completed: boolean;
}

const Task: FC<TaskProps> = ({id, name, description, completed}) => {

    const {
        token: {colorBgContainer, colorBgContainerDisabled},
    } = theme.useToken();

    const dispatch = useAppDispatch()

    const [isEditing, setIsEditing] = useState(false)

    const [currentDescription, setCurrentDescription] = useState(description)
    const [currentName, setCurrentName] = useState(name)

    const onChecked = (e: CheckboxChangeEvent) => {
        dispatch(setCompleted({id: id, isCompleted: e.target.checked}))

    };

    const onChangeName = (text: string) => {
        setCurrentName(text)
    }

    const onChangeDescription = (text: string) => {
        setCurrentDescription(text)
    }

    const onSubmitChange = () => {
        dispatch(changeTask({id: id ,name: currentName, description: currentDescription}))
        setIsEditing(false)
    }

    const onCancelChange = () => {
        setCurrentName(name)
        setCurrentDescription(description)
        setIsEditing(false)
    }

    return (
        <Card
            type="inner"
            style={{background: completed ? colorBgContainerDisabled : colorBgContainer}}
        >
            <Row>
                <div style={{marginRight: "auto", flexGrow: 1}}>
                    <Paragraph
                        editable={{editing: isEditing, icon: <></>, triggerType: [], text: currentName, onChange: onChangeName}}
                    >
                        {name}
                    </Paragraph>
                    <Paragraph
                        editable={{editing: isEditing, icon: <></>, triggerType: [], text: currentDescription, onChange: onChangeDescription}}
                    >
                        {description}
                    </Paragraph>
                </div>
                <TaskButtons
                    taskId={id}
                    isCompleted={completed}
                    onChecked={onChecked}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                />
            </Row>
            {isEditing && <Button onClick={onSubmitChange} type={"link"} style={{marginLeft: -22}}>Подтвердить</Button>}
            {isEditing && <Button onClick={onCancelChange} type={"link"} danger>Отменить</Button>}
        </Card>
    );
};

export default Task;