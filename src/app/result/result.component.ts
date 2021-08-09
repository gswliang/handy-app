import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';
import { todo } from 'src/app/todo-list/todo.model';
import { Video } from 'src/app/videostream/video.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoDetailService } from 'src/app/services/video-detail.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  faClock = faClock;
  videoList$ = this.store.video$;
  todoList$ = this.store.todos$;
  queryParam: string | null = '';
  queryParam$ = this.route.queryParamMap
    .pipe(map((queryParam) => queryParam.get('search')))
    .subscribe((searchTerm) => (this.queryParam = searchTerm));
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

  constructor(
    private store: StoreService,
    private route: ActivatedRoute,
    private videoService: VideoDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateParam();
  }

  updateParam() {
    const query = this.queryParam;
    query
      ? this.videoService.onSearch(query)
      : this.router.navigate(['/utube']);
  }

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

  onSearch(searchTerm: string) {
    this.router.navigate(['utube/result'], {
      queryParams: { search: searchTerm },
    });

    this.videoService.onSearch(searchTerm);
  }
}
