import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { ApiService } from '../../services/authenticator-service.service';
import { User } from '../../models/user.model';
import { Todo } from '../../models/todo.model';

class MockApiService {
  getTodos(userId: string) {
    return Promise.resolve({ todos: [] });
  }
  createTodoItem(todo: Todo) {
    return Promise.resolve();
  }
  updateTodoItem(todo: Todo) {
    return Promise.resolve();
  }
  deleteTodoItem(id: number) {
    return Promise.resolve();
  }
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      providers: [{ provide: ApiService, useClass: MockApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  beforeEach(() => {
    component.user = { id: 1, username: 'testuser' } as User;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', async () => {
    spyOn(apiService, 'getTodos').and.callThrough();
    await component.ngOnInit();
    expect(apiService.getTodos).toHaveBeenCalledWith(component.user.id.toString());
  });

  it('should add a new todo', async () => {
    component.newTodo = 'Test Todo';
    await component.addTodo();
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].todo).toBe('Test Todo');
  });
});