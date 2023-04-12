import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IGroup} from "../../types/IGroup";

interface GroupsState {
    groups: IGroup[] | null;
    isLoading: boolean;
    error: string;
}

const initialState = {
    groups: null,
    isLoading: false,
    error: ''
} as GroupsState


const groupsSlice = createSlice({
    name: 'groupsReducer',
    initialState,
    reducers: {
        groupsFetching(state) {
            state.isLoading = true
        },
        groupsFetchingSuccess(state, action: PayloadAction<IGroup[]>) {
            state.isLoading = false
            state.groups = action.payload
            state.error = ''
        },
        groupsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    },
})

export const { groupsFetchingError, groupsFetchingSuccess, groupsFetching } = groupsSlice.actions
export default groupsSlice.reducer
