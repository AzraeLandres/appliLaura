import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private url = 'http://localhost:8080/movies';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(this.url + '/all');
  }

  getMoviesbyGenreId(id: number): Observable<any> {
    return this.http.get(this.url + '/genre/' + id);
  }

  getMoviesByDateDesc(): Observable<any> {
    return this.http.get(this.url + '/date/desc');
  }
}
