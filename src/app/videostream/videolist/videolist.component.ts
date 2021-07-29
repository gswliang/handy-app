import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Video } from '../video.model';
import { VideoDetailService } from '../video-detail.service';
import { WatchlaterService } from 'src/app/services/watchlater.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';

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
    private addTodoList: WatchlaterService
  ) {}

  ngOnInit(): void {
    this.videoLists$ = this.videoService.updatedVideo;
  }

  onSelected(selectedItem: Video) {
    this.selectedItem.emit(selectedItem);
  }

  onAddTodo(addTodo: Video) {
    this.addTodoList.addToList(addTodo);
  }
}
