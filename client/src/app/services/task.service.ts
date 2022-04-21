import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

export interface INewTask {
  title: string;
  description: string;
}

export interface ITask {
  id: number;
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
    return this.http.put(
      this.tasksUrl + this.loginService.user.id + '/' + id,
      newTask
    );
  }

  toggleStatus(task: ITask) {
    this.http
      .put(
        `http://localhost:3001/api/toggleTask/${this.loginService.user.id}/${task.id}`,
        task
      )
      .subscribe(
        (res) => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  setTasks(tasks: ITask[]): void {
    this.tasks = tasks;
  }

  deleteTask(id: number) {
    return this.http
      .delete(this.tasksUrl + this.loginService.user.id + '/' + id)
      .subscribe(
        (res: any) => {
          window.location.reload();
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  createTask(newTask: INewTask) {
    this.http
      .post(this.tasksUrl + this.loginService.user.id, newTask)
      .subscribe(
        (res: any) => {
          this.tasks.push(res.data);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
