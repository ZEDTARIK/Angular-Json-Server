import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';


@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(task: Task[], searchTerm: string): Task[] {
    if (task || !searchTerm) {
      return task;
    }
    return task.filter(task => 
        task.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1 );
  }

}
