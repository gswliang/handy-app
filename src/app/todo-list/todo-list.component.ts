import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  todoName: string = '';
  faTimes = faTimesCircle;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getList();
  }

  onSubmit(): void {
    if (this.todoName) {
      this.todoService.addToList(this.todoName);
      this.todoName = '';
    }
  }
  onRemove(removeItem: string): void {
    this.todoList = this.todoService.removeFromList(removeItem);
  }

}
