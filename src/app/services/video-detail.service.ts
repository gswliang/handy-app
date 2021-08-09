import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { StoreService } from './store.service';
import { Video, VideoItem } from '../videostream/video.model';
@Injectable({
  providedIn: 'root',
})
export class VideoDetailService {
  private readonly APIkey: string = 'AIzaSyD84fA8fesV_dVYDp9pR9vZbpcgVflZF2s';
  // private readonly APIkey: string = 'AIzaSyAwJJW6tLkk8YJ3D2s3SFMBOgahTIc9t-8';
  private readonly baseURL: string =
    'https://www.googleapis.com/youtube/v3/search?';
  private readonly params: HttpParams = new HttpParams()
    .set('part', 'snippet')
    .set('type', 'video')
    .set('maxResult', 10)
    .set('key', this.APIkey);

  private videoSearchTerm$ = new Subject<string>();

  constructor(private http: HttpClient, private store: StoreService) {}

  getVideos(term: string) {
    if (!term) {
      return of();
    }
    const params = this.params.set('q', term);
    return this.http
      .get<any>(`${this.baseURL}${params}`)
      .pipe(catchError(this.handleError('getApi')));
  }

  onSearch(searchTerm: string) {
    console.log(searchTerm);
    this.videoSearchTerm$.next(searchTerm);
  }

  renderVideoList() {
    this.videoSearchTerm$
      .pipe(
        distinctUntilChanged(),
        switchMap((term) => this.getVideos(term)),
        map((result: any): Video[] =>
          result.items.map((item: VideoItem) => {
            return {
              videoId: item?.id?.videoId,
              title: item?.snippet?.title,
              description: item.snippet?.description,
              picURL: item.snippet?.thumbnails?.high?.url,
            };
          })
        )
      )
      .subscribe((searchResult) => {
        const state = this.store.state;
        this.store.update({ ...state, videos: searchResult });
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of();
    };
  }
}
