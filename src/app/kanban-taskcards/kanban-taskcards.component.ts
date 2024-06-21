import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';

@Component({
  selector: 'app-kanban-taskcards',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,DragDropModule, CommonModule, MaterialModule],
  templateUrl: './kanban-taskcards.component.html',
  styleUrl: './kanban-taskcards.component.css'
})
export class KanbanTaskcardsComponent implements OnInit {

  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task);
  }

}
