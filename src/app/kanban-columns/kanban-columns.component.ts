import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { KanbanModalsComponent } from '../kanban-modals/kanban-modals.component';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../task.model';
import { TaskService } from '../service/task.service';
import { KanbanTaskcardsComponent } from '../kanban-taskcards/kanban-taskcards.component';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kanban-columns',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule,DragDropModule,MaterialModule,KanbanTaskcardsComponent,RouterLink],
  templateUrl: './kanban-columns.component.html',
  styleUrl: './kanban-columns.component.css'
})
export class KanbanColumnsComponent implements OnInit {

  @Input() column: string | any;
  @Input() tasks: Task[] = [];
  @Output() taskDropped = new EventEmitter<{ task: Task, newStatus: string }>();

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks().filter(task => task.status === this.column);
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = this.column;
      this.taskDropped.emit({ task, newStatus: this.column });
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addTask(){
    const dialogRef = this.dialog.open(KanbanModalsComponent, {
      // width: '40%',
      data: { task: null },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  updateTask(task: Task){
    console.log('task',task);
    const dialogRef = this.dialog.open(KanbanModalsComponent, {
      data: { task: task },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  deleteTask(task: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task.id);
        this.tasks = this.taskService.getTasks().filter(task => task.status === this.column);
      }
    });
  }

}
