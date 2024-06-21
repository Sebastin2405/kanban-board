import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MaterialModule } from '../material-module';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskService } from '../service/task.service';
import { KanbanTaskcardsComponent } from '../kanban-taskcards/kanban-taskcards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { KanbanColumnsComponent } from '../kanban-columns/kanban-columns.component';
import { KanbanModalsComponent } from '../kanban-modals/kanban-modals.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [MaterialModule,RouterLink,ReactiveFormsModule,CommonModule,KanbanTaskcardsComponent,DragDropModule,KanbanColumnsComponent,RouterLink],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KanbanBoardComponent implements OnInit {

  columns = ['To Do', 'In Progress', 'Done', 'Testing', 'Deployed'];
  tasks: Task[] = [];
  selectedPriority: string = '';

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  getTasksByStatus(status: string): Task[] {
    const filteredTasks = this.tasks.filter(task => task.status === status);
    return this.sortTasksByPriority(filteredTasks);
  }

  handleTaskDrop(event: { task: Task, newStatus: string }): void {
    const { task, newStatus } : any = event;
    task.status = newStatus;
    this.taskService.updateTask(task);
  }

  sortTasks(): void {
    this.tasks = this.sortTasksByPriority(this.tasks);
  }

  sortTasksByPriority(tasks: Task[]): Task[] {
    const priorityOrder = ['low', 'medium', 'high'];
    if (this.selectedPriority) {
      tasks.sort((a, b) => {
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      });
    }
    return tasks;
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
