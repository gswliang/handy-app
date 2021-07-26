import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VideoDetailService {
  APIkey: string = 'AIzaSyD84fA8fesV_dVYDp9pR9vZbpcgVflZF2s';
  baseURL: string = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResult=10&key=${this.APIkey}&q=`


  constructor(private http: HttpClient) { }

  getVideos(term: string = 'taipei'): Observable<any> {
    this.baseURL = this.baseURL + term;
    return this.http.get(this.baseURL).pipe(
      catchError(this.handleError('getApi'))
    )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
