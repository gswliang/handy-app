import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Video } from '../video.model';
import { WatchlaterService } from 'src/app/services/watchlater.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { VideoDetailService } from 'src/app/services/video-detail.service';
import { StoreService } from 'src/app/store.service';
import { todo } from 'src/app/todo-list/todo.model';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css'],
})
export class VideolistComponent implements OnInit {
  videoLists$!: Observable<Video[]>;
  faClock = faClock;
  isDisabled: boolean = false;
  @Output() selectedItem = new EventEmitter<Video>();

  constructor(
    private videoService: VideoDetailService,
    private addTodoList: WatchlaterService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.videoLists$ = this.videoService.updatedVideo;
  }

  onSelected(selectedItem: Video) {
    this.selectedItem.emit(selectedItem);
  }

  onAddTodo(addTodo: Video, event: Event) {
    event.stopPropagation();
    const state = this.store.state;
    const addVideo: todo = { text: addTodo.title, videoId: addTodo.videoId };
    this.store.update({ ...state, todos: [...state.todos, addVideo] });
  }
}
