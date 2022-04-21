import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
})
export class UpdateFormComponent implements OnInit {
  updateForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.formBuilder.group(
      {
        title: [this.data.title, Validators.required],
        description: [this.data.description, Validators.required],
      },
      { updateOn: 'submit' }
    );
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.updateForm.updateValueAndValidity();
    this.updateForm.markAllAsTouched();
    if (this.updateForm.valid) {
      Swal.fire({
        title: 'Update',
        text: 'Are you sure you want to update this?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'No',
        cancelButtonColor: '#dc3545',
        showConfirmButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#0d6efd',
      }).then((res) => {
        if (res.isConfirmed) {
          Swal.fire({
            title: 'Success',
            text: 'Your task has been successfully updated',
            icon: 'success',
          }).then(() => {
            this.taskService.updateTask({
              ...this.updateForm.value,
              id: this.data.id,
            });
            window.location.reload();
          });
        }
      });
    }
  }
}
