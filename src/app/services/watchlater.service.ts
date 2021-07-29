import { Injectable } from '@angular/core';
import { Video, VideoInList } from '../videostream/video.model';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class WatchlaterService {
  selectedVideo!: VideoInList;
  constructor(private todoService: TodoService) {}

  addToList(selectedItem: Video) {
    this.selectedVideo = {
      isDisabled: true,
      selectedVideo: selectedItem,
    };
    console.log(this.selectedVideo);

    const addVideoToList: string = `Watch ${selectedItem.title}`;
    this.todoService.addToList(addVideoToList);
  }
}
