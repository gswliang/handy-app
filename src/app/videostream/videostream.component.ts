import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Video, VideoItem } from './video.model';
import { VideoDetailService } from '../services/video-detail.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-videostream',
  templateUrl: './videostream.component.html',
  styleUrls: ['./videostream.component.css'],
})
export class VideostreamComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoDetailService,
    private sanitizer: DomSanitizer,
    private store: StoreService
  ) {}

  faSearchIcon = faSearch;
  searchTerm: string = '';
  tubeURL: string = 'https://www.youtube.com/embed/';
  queryParam: string | null = null;

  videoTermSearch$ = new Subject<string>();
  queryParam$ = this.route.queryParamMap
    .pipe(map((queryParam) => queryParam.get('search')))
    .subscribe((searchTerm) => (this.queryParam = searchTerm));
  paramId$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  mainVideoUrl$: Observable<SafeResourceUrl | null> = combineLatest([
    this.paramId$,
    this.store.video$,
    this.store.paramId$,
  ]).pipe(
    tap(
      ([paramId]) =>
        paramId && this.store.update({ ...this.store.state, paramId })
    ),
    map(([paramId, videoList, storeParamId]) => {
      return paramId ?? storeParamId ?? videoList[0].videoId;
    }),
    map((mainVideoId) =>
      mainVideoId ? this.getSanitizeURL(mainVideoId) : null
    )
  );

  ngOnInit(): void {
    this.renderVideo();
    this.queryParam && this.videoTermSearch$.next(this.queryParam);
  }

  onSubmit(): void {
    this.videoTermSearch$.next(this.searchTerm);
    this.router.navigate(['/utube'], {
      queryParams: { search: this.searchTerm },
    });
    this.searchTerm = '';
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
            };
          })
        )
      )
      .subscribe((videos) => {
        const state = this.store.state;
        this.store.update({ ...state, videos });
      });
  }

  private getSanitizeURL(videoId: string | undefined) {
    const fullURL = `${this.tubeURL}${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullURL);
  }
}
