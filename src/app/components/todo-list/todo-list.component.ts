import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/authenticator-service.service';
import { User } from '../../models/user.model';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() user: User = {} as User;
  todos: Todo[] = [];
  newTodo: string = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTodos(this.user.id.toString()).then((response) => {
      this.todos = response.todos;
    });
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateTodo(todo);
  }

  addTodo() {
    if (!this.newTodo.trim()) {
      alert('Please enter a to do item');
      return;
    }

    const newTodoItem: Todo = {
      id: this.getLastID(this.todos) + 1,
      todo: this.newTodo,
      completed: false,
      userId: this.user.id
    };

    this.todos.push(newTodoItem);
    this.newTodo = '';

    this.api.createTodoItem(newTodoItem).then(() => {
      alert('To do item added successfully in DB!');
    });
  }

  updateTodo(todo: Todo) {
    this.api.updateTodoItem(todo).then(() => {
      alert('To do item updated successfully in DB!');
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this.api.deleteTodoItem(id).then(() => {
      alert('To do item updated successfully removed from DB!');
    });
  }

  getLastID(todos: Todo[]): number {
    return Math.max(...todos.map(todo => todo.id));
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
