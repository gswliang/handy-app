import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { switchMap, distinctUntilChanged, map } from 'rxjs/operators';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { VideoDetailService } from './video-detail.service';
import { Video } from './video.model';

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
  D;
  searchTerm: string = '';
  videoTermSearch$ = new Subject<string>();
  mainVideo: Video = {};
  tubeURL: string = 'https://www.youtube.com/embed/';

  ngOnInit(): void {
    this.renderVideo();
    // this.videoTermSearch$.next('taipei');
    this.videoService.updatedVideo.subscribe(
      (arr) => (this.mainVideo = { ...arr[0] })
    );
  }

  onSubmit(): void {
    this.videoTermSearch$.next(this.searchTerm);
    this.searchTerm = '';
  }

  renderVideo() {
    this.videoTermSearch$
      .pipe(
        distinctUntilChanged(),
        switchMap((term) => this.videoService.getVideos(term)),
        map(({ items }) =>
          items.map((item) => {
            return {
              videoId: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              picURL: item.snippet.thumbnails.high.url,
            };
          })
        )
      )
      .subscribe((arr) => this.videoService.storeVideos(arr));
  }
  setSanitizeURL() {
    const fullURL = `${this.tubeURL}${this.mainVideo.videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullURL);
  }

  onSelectedId(selectedItem: Video) {
    this.mainVideo = selectedItem;
  }
}
