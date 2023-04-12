import React, { useState } from 'react';
import { Button, Row, Space, theme } from "antd";
import Title from "antd/es/typography/Title";
import {Header} from "antd/es/layout/layout";
import {useAppDispatch} from "../../store/hooks";
import CreateTask from "../CreateTaskModal/CreateTask";
import {ITask} from "../../types/ITask";
import {createTask} from "../../store/reducers/TasksSlice";

const MyHeader = () => {

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [isModalOpen, setIsModalOpen] = useState(false)

    const onCreate = (values: any) => {
        console.log('Received values of form: ', values);
        const newTask = {
            name: values.name,
            groupId: values.group,
            description: values.description
        } as ITask
        dispatch(createTask(newTask))
        setIsModalOpen(false);
    };

    const dispatch = useAppDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Header style={{padding: 0, background: colorBgContainer}}>
                <Row justify={"space-between"} align={"middle"} style={{padding: "0 24px", width: "100%"}}>
                    <Space>
                        <Title level={5} style={{margin: 0}}>App Todo</Title>
                    </Space>
                    <Space>
                        <Button type={"primary"} onClick={() => showModal()}>
                            Новая задача
                        </Button>
                        <Button>
                            Выйти
                        </Button>
                    </Space>
                </Row>
            </Header>
            <CreateTask onCreate={onCreate} open={isModalOpen} onCancel={() => setIsModalOpen(false)}/>
        </>
    );
};

export default MyHeader;