import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Video, VideoItem } from './video.model';
import { VideoDetailService } from '../services/video-detail.service';

@Component({
  selector: 'app-videostream',
  templateUrl: './videostream.component.html',
  styleUrls: ['./videostream.component.css'],
})
export class VideostreamComponent implements OnInit {
  constructor(
    private videoService: VideoDetailService,
    private sanitizer: DomSanitizer
  ) {}

  faSearchIcon = faSearch;
  searchTerm: string = '';
  videoTermSearch$ = new Subject<string>();
  mainVideo!: Video;
  tubeURL: string = 'https://www.youtube.com/embed/';
  safeURL!: SafeResourceUrl;

  ngOnInit(): void {
    this.renderVideo();
    this.onSelectedVideo();
  }

  onSubmit(): void {
    this.videoTermSearch$.next(this.searchTerm);
    this.searchTerm = '';
    // 0 ?? 'hi'
  }

  renderVideo() {
    this.videoTermSearch$
      .pipe(
        distinctUntilChanged(),
        switchMap((term) => this.videoService.getVideos(term)),
        map((result: any): Video[] =>
          result.items.map((item: VideoItem) => {
            return {
              videoId: item?.id?.videoId,
              title: item?.snippet?.title,
              description: item?.snippet?.description,
              picURL: item?.snippet?.thumbnails?.high?.url,
              isDisable: false,
            };
          })
        )
      )
      .subscribe((arr) => {
        this.videoService.updateVideo(arr);
        this.videoService.selectedVideo(arr[0].videoId);
      });
  }
  setSanitizeURL() {
    const fullURL = `${this.tubeURL}${this.mainVideo.videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullURL);
  }

  onSelectedVideo() {
    this.videoService.showVideo$.subscribe((item) => {
      this.mainVideo = item;
      this.safeURL = this.setSanitizeURL();
    });
  }
}
