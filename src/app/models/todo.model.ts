export class Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;

    constructor(id: number, todo: string, completed: boolean, userId: number) {
        this.id = id;
        this.todo = todo;
        this.completed = completed;
        this.userId = userId;
    }
}