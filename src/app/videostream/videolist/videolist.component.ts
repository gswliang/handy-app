import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../video.model';
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
  videoLists$ = this.videoService.storeVideo$;
  faClock = faClock;

  constructor(
    private videoService: VideoDetailService,
    private store: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSelectedItem(id: string | undefined) {
    this.videoService.selectedVideo(id);
  }

  onAddTodo(addTodo: Video, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const state = this.store.state;
    const addVideo: todo = { text: addTodo.title, videoId: addTodo.videoId };
    this.store.update({ ...state, todos: [...state.todos, addVideo] });
    this.videoService.statusCheck(addVideo, true);
  }
}
