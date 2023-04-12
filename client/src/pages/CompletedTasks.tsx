import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {fetchAllGroups, fetchAllTasks} from "../store/reducers/ActionCreators";
import {Space} from "antd";
import TaskGroup from "../components/TaskGroup/TaskGroup";

const CompletedTasks = () => {

    const dispatch = useAppDispatch()
    const {tasks} = useAppSelector(state => state.TasksSlice)

    const {groups} = useAppSelector(state => state.GroupsSlice)

    useEffect(() => {
        if (!tasks) {
            dispatch(fetchAllTasks())

        }
        if (!groups) {
            dispatch(fetchAllGroups())
        }
    }, [])

    return (
        <main>
            <Space size={"large"} direction={"vertical"} style={{width: "100%"}}>
                {groups && tasks ? groups.map(group => {
                        const groupTasks = [...tasks].filter(task => task.groupId === group.id && task.completed)
                        return (<TaskGroup key={group.id} name={group.name} tasks={groupTasks}/>)
                    }) :
                    <h2>Loading...</h2>
                }
            </Space>
        </main>
    );
};

export default CompletedTasks;