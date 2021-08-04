import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { videoData } from './mock/videos-mock';
import { todo } from './todo-list/todo.model';
import { Video } from './videostream/video.model';

export interface State {
  todos: todo[];
  videos: Video[];
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}
  private readonly initState: State = {
    todos: [{ text: 'Walking dog' }, { text: 'Booking a ticket' }],
    videos: videoData,
  };

  private readonly store$ = new BehaviorSubject<State>(this.initState);
  private readonly state$ = this.store$.asObservable();
  readonly todos$ = this.state$.pipe(
    pluck<State, todo[]>('todos'),
    distinctUntilChanged()
  );

  readonly video$ = this.state$.pipe(
    pluck<State, Video[]>('videos'),
    distinctUntilChanged()
  );

  get state(): State {
    return this.store$.getValue();
  }

  update(state: State) {
    this.store$.next(state);
  }
}
