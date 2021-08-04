import { Component, OnInit } from '@angular/core';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { todo } from './todo.model';
import { State, StoreService } from '../store.service';
import { VideoDetailService } from '../services/video-detail.service';

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
  todos$ = this.store.todos$;

  constructor(
    private readonly store: StoreService,
    private videoService: VideoDetailService
  ) {}

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

  onSelectedVideo(selectedTodo: todo) {
    this.onRemove(selectedTodo);
  }
}
