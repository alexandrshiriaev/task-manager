import {IGroup} from "../types/IGroup";
import axios, {AxiosResponse} from "axios";

export default class GroupsService {
    static async fetchAll(): Promise<AxiosResponse> {
        const response = axios.get<IGroup[]>('/groups.json')
        return response
    }

}