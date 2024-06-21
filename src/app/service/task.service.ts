import { Injectable } from '@angular/core';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
    }
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = this.nextId++;
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasksToLocalStorage();
  }
}
