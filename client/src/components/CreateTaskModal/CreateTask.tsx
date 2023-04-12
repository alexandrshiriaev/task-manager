import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import {useAppSelector} from "../../store/hooks";
import {IGroup} from "../../types/IGroup";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CreateTaskProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();

    const groups = useAppSelector(state => state.GroupsSlice.groups)

    return (
        <Modal
            open={open}
            title="Новая задача"
            okText="Создать"
            cancelText="Отменить"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{modifier: 'public'}}
            >
                <Form.Item name="name" label="Название"
                           rules={[{required: true, message: 'Пожалуйста, введите название задачии!'}]}>
                    <Input placeholder={"Введите название задачи..."}/>
                </Form.Item>
                <Form.Item name="description" label="Описание">
                    <Input placeholder={"Введите описание задачи..."}/>
                </Form.Item>
                <Form.Item name="group" label="Группа задач">
                    <Select
                        placeholder="Выберите группу задач"
                        allowClear
                        options={groups ? groups.map((group: IGroup) => {
                            return {value: group.id, label: group.name}
                        }) : []}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTask;