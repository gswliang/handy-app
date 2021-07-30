import { Injectable } from '@angular/core';
import { Video, VideoInList } from '../videostream/video.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlaterService {
  selectedVideo!: VideoInList;
  constructor() {}

  addToList(selectedItem: Video) {
    this.selectedVideo = {
      isDisabled: true,
      selectedVideo: selectedItem,
    };
    console.log(this.selectedVideo);

    const addVideoToList: string = `Watch ${selectedItem.title}`;
  }
}
