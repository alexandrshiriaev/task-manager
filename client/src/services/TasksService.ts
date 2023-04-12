import {ITask} from "../types/ITask";
import axios, {AxiosResponse} from "axios";

export default class TasksService {
    static async fetchAll(): Promise<AxiosResponse> {
        const response = axios.get<ITask[]>('/tasks.json')
        return response
    }
}