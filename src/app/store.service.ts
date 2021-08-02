import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck, filter, tap, map } from 'rxjs/operators';
import { todo } from './todo-list/todo.model';

export interface State {
  todos: todo[];
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}
  private readonly initState: State = {
    todos: [{ text: 'Walking dog' }, { text: 'Booking a ticket' }],
  };

  private readonly store$ = new BehaviorSubject<State>(this.initState);
  private readonly state$ = this.store$.asObservable();
  readonly todos$ = this.state$.pipe(
    pluck<State, todo[]>('todos'),
    distinctUntilChanged()
  );

  get state(): State {
    return this.store$.getValue();
  }

  update(state: State) {
    this.store$.next(state);
    // this.todos$.subscribe(console.log); //bad practice, shouldn't be subscribe multiple times.
  }
}
