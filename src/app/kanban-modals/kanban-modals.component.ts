import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { TaskService } from '../service/task.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kanban-modals',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule,DragDropModule,MaterialModule],
  templateUrl: './kanban-modals.component.html',
  styleUrl: './kanban-modals.component.css'
})
export class KanbanModalsComponent implements OnInit {

  @Input() task: Task | null;
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<KanbanModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null }
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
    });
    this.task = data.task;
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }


  onSave(): void {
    if (this.taskForm.valid) {
      console.log('Form Submitted', this.taskForm.value);
      const formValue = this.taskForm.value;
      const newTask: Task = {
        ...this.task,
        ...formValue,
        dueDate: new Date(formValue.dueDate),
        status: this.task ? this.task.status : 'To Do'
      };  
      if (this.task) {        
        console.log('Update', newTask);
        this.taskService.updateTask(newTask);
      } else {
        console.log('Add', newTask);
        this.taskService.addTask(newTask);
      }
      this.dialogRef.close(newTask);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
