import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/models/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  Tasks: Task[] = [];
  ResultTasks: Task[] = [];

  showForm = false;
  isEditForm = false;
  searchTxt = '';

  taskForm: Task = {
    Title: '',
    isCompleted: false,
    isDeleted: false
  };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getData()
      .subscribe(data => {
        this.ResultTasks = this.Tasks =  data;
      });
  }

  onDelete(id) {
    this.taskService.deteleTask(id)
      .subscribe(() => {
        const i = this.Tasks.findIndex(e => e.id === id);
        if (i !== -1) {
          this.Tasks.splice(i, 1);
        }
      });
  }


  onAddTask() {
    this.taskService.persisteTask(this.taskForm)
      .subscribe((task) => {
        // this.Tasks = [task, ...this.Tasks];
        this.Tasks.unshift(task);
        this.resetForm();
      });
  }

  resetForm() {
    this.taskForm = {
      Title: '',
      isCompleted: false,
      isDeleted: false
    }
    this.showForm = false;
  }

  onToggleIsCompleted(task: Task) {
    this.taskService.changeCompleted(task.id, task.isCompleted)
      .subscribe(() => {
        task.isCompleted = !task.isCompleted;
      });
  }

  editTask(task) {
    this.showForm = true
    this.taskForm = task;
    this.isEditForm = true;
  }

  onEditTask() {
    this.taskService.updateTask(this.taskForm)
      .subscribe(() => {
        this.resetForm();
        this.isEditForm = false;
      });
  }

  onSearchTxt() {
    return  this.Tasks = this.ResultTasks.filter(task =>
      task.Title.toLowerCase().indexOf(this.searchTxt.toLowerCase()) !== -1)
  }

}
