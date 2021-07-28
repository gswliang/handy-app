import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Video } from '../video.model';
import { VideoDetailService } from '../video-detail.service';



@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {
  videoLists$!: Observable<Video[]>;
  @Output() selectedItem = new EventEmitter<Video>();

  constructor(private videoService: VideoDetailService) { }

  ngOnInit(): void {
    this.videoLists$ = this.videoService.updatedVideo;
  }

  onSelected(selectedItem: Video) {
    this.selectedItem.emit(selectedItem);
  }
}
