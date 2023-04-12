import { configureStore } from '@reduxjs/toolkit'
import GroupsSlice from "./reducers/GroupsSlice";
import TasksSlice from "./reducers/TasksSlice";

export const store = configureStore({
    reducer: {
        GroupsSlice,
        TasksSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch