import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { TaskService } from '../services/task.service';
import { ITask } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  public taskForm: FormGroup;
  constructor(
    private loginService: LoginService,
    public taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.loginService.logged) {
      this.router.navigate(['/login']);
    }
    this.createForm();
    this.taskService.getTasks().subscribe(
      (tasks: any) => {
        this.taskService.setTasks(tasks.data);
        console.log(this.taskService.tasks);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  createForm(): void {
    this.taskForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
      },
      { updateOn: 'submit' }
    );
  }

  createTask(e: SubmitEvent) {
    this.taskForm.markAllAsTouched();
    this.taskForm.updateValueAndValidity();
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value);
      Swal.fire({
        title: 'Task successfully created',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#0d6efd',
      });
    }
  }

  toggleStatus(task: ITask) {
    this.taskService.toggleStatus(task);
  }

  //Use a modal to update task.
  updateTask() {}

  deleteTask(id: number) {
    Swal.fire({}); //check if he wants to delete and then delete.
    this.taskService.deleteTask(id);
  }
}
