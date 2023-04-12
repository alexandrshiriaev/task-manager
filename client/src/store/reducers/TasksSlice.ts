import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ITask} from "../../types/ITask";

interface TasksState {
    tasks: ITask[] | null,
    isLoading: boolean,
    error: string
}

interface SetCompletedPayload {
    id: number;
    isCompleted: boolean;
}

interface CreateTaskPayload {
    name: string;
    description?: string;
    groupId?: number;
}

interface DeleteTaskPayload {
    id: number;
}

interface ChangeTaskPayload {
    id: number;
    name: string;
    description?: string;
}

const initialState = {
    tasks: null,
    isLoading: false,
    error: ''
} as TasksState


const tasksSlice = createSlice({
    name: 'tasksReducer',
    initialState,
    reducers: {
        tasksFetching(state) {
            state.isLoading = true
        },
        tasksFetchingSuccess(state, action: PayloadAction<ITask[]>) {
            state.isLoading = false
            state.error = ''
            state.tasks = action.payload
        },
        tasksFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        setCompleted(state, action: PayloadAction<SetCompletedPayload>) {
            if (!state.tasks) return
            const tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return {...task, completed: action.payload.isCompleted}
                } else {
                    return task
                }
            })
            state.tasks = tasks
        },
        createTask(state, action: PayloadAction<CreateTaskPayload>) {
            if (!state.tasks) return
            const id = state.tasks.length ? state.tasks[state.tasks.length - 1].id + 1 : 1
            const newTask: ITask = {
                id: id,
                name: action.payload.name,
                description: action.payload.description,
                groupId: action.payload.groupId,
                completed: false
            } as ITask
            state.tasks.push(newTask)
        },
        deleteTask(state, action: PayloadAction<DeleteTaskPayload>) {
            if (!state.tasks) return
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
        },
        changeTask(state, action: PayloadAction<ChangeTaskPayload>) {
            if (!state.tasks) return
            const tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return {...task, name: action.payload.name, description: action.payload.description}
                } else {
                    return task
                }
            })
            state.tasks = tasks
        }
    },
})

export const {
    tasksFetching,
    tasksFetchingSuccess,
    tasksFetchingError,
    setCompleted,
    createTask,
    deleteTask,
    changeTask
} = tasksSlice.actions
export default tasksSlice.reducer
