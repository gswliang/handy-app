import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Video } from './video.model';


@Injectable({
  providedIn: 'root'
})
export class VideoDetailService {
  private readonly APIkey: string = 'AIzaSyD84fA8fesV_dVYDp9pR9vZbpcgVflZF2s';
  // private readonly APIkey: string = 'AIzaSyAwJJW6tLkk8YJ3D2s3SFMBOgahTIc9t-8';
  private readonly baseURL: string = 'https://www.googleapis.com/youtube/v3/search?'
  private readonly params: HttpParams = new HttpParams()
    .set('part', 'snippet')
    .set('type', 'video')
    .set('maxResult', 10)
    .set('key', this.APIkey)
  private videoData: Video[] = [];
  updatedVideo = new BehaviorSubject<Video[]>(this.videoData);

  constructor(private http: HttpClient) { }

  getVideos(term: string) {
    if (!term) { return of() };
    const params = this.params.set('q', term);
    return this.http.get<any>(`${this.baseURL}${params}`).pipe(
      catchError(this.handleError('getApi'))
    )
  }

  storeVideos(param) {
    this.videoData = [...param];
    this.updatedVideo.next(this.videoData);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of();
    }
  }
}
