import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css', '../videostream/videostream.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  todoItems: string = '';
  faTimes = faTimesCircle;
  faSearchIcon = faSearch;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getList().subscribe(arr => this.todoList = arr)
  }

  onSubmit(todoItem: string): void {
    if (todoItem) {
      this.todoService.addToList(todoItem);
      this.todoItems = '';
      this.todoService.getList().subscribe(value => {
        this.todoList = value
      })
    }
  }
  onRemove(removeItem: string): void {
    this.todoList = this.todoService.removeFromList(removeItem);
  }


}
