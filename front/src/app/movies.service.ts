import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private url = 'http://localhost:8080/movies';

  private tmdbApiKey = 'bfe71b7c7b147b1316508086f210ad2a';
  constructor(private http: HttpClient) {}

  getMoviePoster(movieTitle: string): Observable<string> {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          this.tmdbApiKey
        }&query=${encodeURIComponent(movieTitle)}`
      )
      .pipe(
        map((response: { results: any[] }) => {
          const movie = response.results[0];
          return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        })
      );
  }

  getMovies(): Observable<any> {
    return this.http.get(this.url + '/all');
  }

  getMoviesbyGenreId(id: number): Observable<any> {
    return this.http.get(this.url + '/genre/' + id);
  }

  getMoviesByDateDescTop3(): Observable<any> {
    return this.http.get(this.url + '/date/top3');
  }
}
