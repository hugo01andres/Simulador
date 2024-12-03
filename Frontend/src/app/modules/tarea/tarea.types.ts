export interface Task {
    id?: number;
    name: string;
    user: User
}
export interface TaskList {
    id: number;
    name: string;
    user: User
}
export interface User {
    username: string;
}