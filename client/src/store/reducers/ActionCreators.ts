import {AppDispatch} from "../index";
import TasksService from "../../services/TasksService";
import {tasksFetching, tasksFetchingError, tasksFetchingSuccess} from "./TasksSlice";
import {groupsFetching, groupsFetchingError, groupsFetchingSuccess} from "./GroupsSlice";
import GroupsService from "../../services/GroupsService";

export const fetchAllTasks = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(tasksFetching())
        const response = await TasksService.fetchAll()
        dispatch(tasksFetchingSuccess(response.data))
    } catch (error: any) {
        dispatch(tasksFetchingError(error.message))
    }
}

export const fetchAllGroups = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(groupsFetching())
        const response = await GroupsService.fetchAll()
        dispatch(groupsFetchingSuccess(response.data))
    } catch (error: any) {
        dispatch(groupsFetchingError(error.message))
    }
}