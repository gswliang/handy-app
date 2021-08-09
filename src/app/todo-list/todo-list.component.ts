import { Component, OnInit } from '@angular/core';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { todo } from './todo.model';
import { State, StoreService } from '../services/store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: [
    './todo-list.component.css',
    '../inputsection/inputsection.component.css',
  ],
})
export class TodoListComponent implements OnInit {
  faTimes = faTimesCircle;
  faSearchIcon = faSearch;
  todos$ = this.store.todos$;

  constructor(private readonly store: StoreService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(text: string): void {
    const state = this.store.state;
    const newTodo: todo = { text };
    this.store.update({ ...state, todos: [...state.todos, newTodo] });
  }

  onRemove(removeItem: todo): void {
    const state = this.store.state;
    const newState: todo[] = state.todos.filter(
      (arr) => arr.text !== removeItem.text
    );
    const newObj: State = { ...state, todos: newState };
    this.store.update(newObj);
  }
}
