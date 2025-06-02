import { Component } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue!: string;
  editTaskValue!: string;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe((res) => {
      this.taskArr = res;
    });
  }

  addTask() {
    const trimmedTask = this.addTaskValue.trim();
    if (!trimmedTask) {
      alert('Por favor, insira uma tarefa válida.');
      return;
    }

    this.taskObj.task_name = trimmedTask;
    this.crudService.addTask(this.taskObj).subscribe(() => {
      this.refreshTaskList();
      this.addTaskValue = ''; // limpa o input
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(() => {
      this.refreshTaskList();
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(() => {
      this.refreshTaskList();
    });
  }

  refreshTaskList() {
    this.getAllTask();
  }

  call(etask: Task) {
    this.taskObj = { ...etask }; // faz cópia
    this.editTaskValue = etask.task_name;
  }
}
