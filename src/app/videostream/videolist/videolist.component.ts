import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Video } from '../video.model';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { VideoDetailService } from 'src/app/services/video-detail.service';
import { StoreService } from 'src/app/store.service';
import { todo } from 'src/app/todo-list/todo.model';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css'],
})
export class VideolistComponent implements OnInit {
  videoList$ = this.store.video$;
  todoList$ = this.store.todos$;

  data$ = combineLatest([this.videoList$, this.todoList$]);
  adjustedVideoList$ = this.data$.pipe(
    map(([videoList, todoList]) => {
      return videoList.map((video) => {
        const isDisabled = todoList.some(
          (todoItem) => video.videoId === todoItem.videoId
        );
        return { ...video, isDisabled };
      });
    })
  );

  faClock = faClock;

  constructor(
    private videoService: VideoDetailService,
    private store: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onAddTodo(selectedVideo: Video, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const state = this.store.state;
    const newTodo: todo = {
      text: selectedVideo.title,
      videoId: selectedVideo.videoId,
    };
    this.store.update({ ...state, todos: [...state.todos, newTodo] });
  }
}
