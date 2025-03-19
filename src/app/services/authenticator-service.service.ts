import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  // AUTH ENDPOINTS
  loginWithCredentials(username: string, password: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
      username: username,
      password: password,
      expiresMins: 120, // Optional, default 60
    });

    return new Promise((resolve, reject) => {
      this.http.post<string>(this.apiUrl + "/auth/login", body, { headers: headers, responseType: 'text' as 'json' })
        .subscribe(
          (response: string) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getUser(token: string): Promise<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return new Promise((resolve, reject) => {
      this.http.get<any>(this.apiUrl + "/auth/me", { headers: headers })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  // TO DOs Endpoints
  getTodos(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.apiUrl + "/todos/user/" + id, {})
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createTodoItem(todoObj: Todo): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const { id, ...todo } = todoObj;
    const body = JSON.stringify(todo);

    return new Promise((resolve, reject) => {
      this.http.post<string>(this.apiUrl + "/todos/add", body, { headers: headers, responseType: 'text' as 'json' })
        .subscribe(
          (response: string) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  updateTodoItem(todoObj: Todo): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const { id, ...todo } = todoObj;
    const body = JSON.stringify(todo);

    return new Promise((resolve, reject) => {
      this.http.put<string>(this.apiUrl + "/todos/" + todoObj.id, body, { headers: headers, responseType: 'text' as 'json' })
        .subscribe(
          (response: string) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  deleteTodoItem(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete<string>(this.apiUrl + "/todos/" + id, {})
        .subscribe(
          (response: string) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
