import { Component, OnInit } from '@angular/core';
import { Video } from '../video.model';
import { VideoDetailService } from '../video-detail.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {
  videoLists$!: Observable<Video[]>;


  constructor(private videoService: VideoDetailService) { }

  ngOnInit(): void {
    this.videoLists$ = this.videoService.updatedVideo;
  }

  onSelected(selectedItem) {
    const videoId = selectedItem.videoId;
  }



}
