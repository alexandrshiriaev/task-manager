import {Navigate, RouteObject} from "react-router-dom";
import App from "../../App";
import Tasks from "../../pages/Tasks";
import CompletedTasks from "../../pages/CompletedTasks";

export enum PATH {
    CURRENT_TASKS = '/tasks',
    COMPLETED_TASKS = '/tasks/completed'
}

export const privateRoutes: RouteObject[] = [
    {path: '/', element: <App /> as JSX.Element, children: [
            {path: '/', element: <Navigate to={PATH.CURRENT_TASKS}/>},
            {path: PATH.CURRENT_TASKS, element: <Tasks/>},
            {path: PATH.COMPLETED_TASKS, element: <CompletedTasks/>},
            {path: '/*', element: <Navigate to={PATH.CURRENT_TASKS}/>}
        ]},
    {path: '/tasks'},
]