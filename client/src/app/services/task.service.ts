import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

interface INewTask {
  title: string;
  description: string;
}

interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: ITask[] = [];
  tasksUrl: string = 'http://localhost:3001/api/tasks/';
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getTasks() {
    return this.http.get(this.tasksUrl + this.loginService.user.id);
  }

  getOneTask(id: string) {
    return this.http.get(this.tasksUrl + this.loginService.user.id + '/' + id);
  }

  updateTask(id: string, newTask: ITask) {
    return this.http.patch(
      this.tasksUrl + this.loginService.user.id + '/' + id,
      newTask
    );
  }

  setTasks(tasks: ITask[]): void {

  }

  deleteTask(id: string) {
    return this.http.delete(
      this.tasksUrl + this.loginService.user.id + '/' + id
    );
  }

  createTask(newTask: INewTask) {
    this.http.post(this.tasksUrl + this.loginService.user.id, newTask);
    // this.tasks.push(newTask);
  }
}
