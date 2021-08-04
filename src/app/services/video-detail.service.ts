import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class VideoDetailService {
  private readonly APIkey: string = 'AIzaSyAwJJW6tLkk8YJ3D2s3SFMBOgahTIc9t-8';
  private readonly baseURL: string =
    'https://www.googleapis.com/youtube/v3/search?';
  private readonly params: HttpParams = new HttpParams()
    .set('part', 'snippet')
    .set('type', 'video')
    .set('maxResult', 10)
    .set('key', this.APIkey);

  constructor(private http: HttpClient) {}

  getVideos(term: string) {
    if (!term) {
      return of();
    }
    const params = this.params.set('q', term);
    return this.http
      .get<any>(`${this.baseURL}${params}`)
      .pipe(catchError(this.handleError('getApi')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of();
    };
  }
}
