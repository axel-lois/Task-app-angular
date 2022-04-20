import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { TaskService } from '../services/task.service';

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
      // this.router.navigate(['/login']);
    }
    this.createForm();
    this.taskService.getTasks().subscribe(
      (tasks: any) => {
        console.log(tasks);
        this.taskService.tasks = tasks.data;
        //set values
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

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
    }
    console.log(this.taskForm.value);
  }
}
