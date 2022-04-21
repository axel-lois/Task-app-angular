import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { TaskService } from '../services/task.service';
import { ITask } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateFormComponent } from '../update-form/update-form.component';

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
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
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
      Swal.fire({
        title: 'Task successfully created',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#0d6efd',
      }).then((res) => {
        this.taskService.createTask(this.taskForm.value);
      });
    }
  }

  toggleStatus(task: ITask) {
    this.taskService.toggleStatus(task);
  }

  openDialog(id: number, title: string, description: string) {
    const dialogRef = this.matDialog.open(UpdateFormComponent, {
      width: '400px',
      data: { id, title, description },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('dialog closed');
    });
  }

  //Use a modal to update task.
  updateTask(e: SubmitEvent, title: string, description: string) {
    e.preventDefault();
    Swal.fire({
      title: 'Success',
      icon: 'success',
      text: 'You succesfully updated the task.',
    }).then(() => {
      window.location.reload();
    });
  }

  deleteTask(id: number) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: "No, I'm not",
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          title: 'Success',
          text: 'Your task has been deleted.',
          icon: 'success',
        }).then((res) => {
          this.taskService.deleteTask(id);
        });
      } else if (
        /* Read more about handling dismissals below */
        res.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          icon: 'error',
          text: 'Your task is safe.',
        });
      }
    });
  }
}
