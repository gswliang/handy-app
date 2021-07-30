import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { todo, TodoVideo } from './todo.model';
import { State, StoreService } from '../store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [
    './todo-list.component.css',
    '../videostream/videostream.component.css',
  ],
})
export class TodoListComponent implements OnInit {
  faTimes = faTimesCircle;
  faSearchIcon = faSearch;
  todos$: Observable<todo[]>;

  constructor(
    private todoService: TodoService,
    private readonly store: StoreService
  ) {
    this.todos$ = this.store.todos$;
  }

  ngOnInit(): void {
    // this.todos$ = this.store.todos$;
  }

  onSubmit(text: string): void {
    const state = this.store.state;
    const newTodo: todo = { text };
    this.store.update({ ...state, todos: [...state.todos, newTodo] });
  }

  onRemove(removeItem: todo): void {
    this.store.removeState(removeItem);
  }
}
