import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<Task[]>(this.url);
  }

  deteleTask(id) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  persisteTask(task: Task) {
    return this.http.post<Task>(this.url, task);
  }

  changeCompleted(id, isCompleted) {
    return this.http.patch(`${this.url}/${id}`, { isCompleted: !isCompleted })
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.url}/${task.id}`, task);
  }

}
