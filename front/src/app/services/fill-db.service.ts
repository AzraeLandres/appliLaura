import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pipe, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';
import { Page } from './Page';
@Injectable({
  providedIn: 'root',
})
export class FillDbService {
  constructor(private http: HttpClient) {}
  private url = 'https://dino-cine-back-15b7eabfff73.herokuapp.com/movies';
  private tmdbApiKey = 'bfe71b7c7b147b1316508086f210ad2a';
  getAllMovies() {
    return this.http.get<Movie[]>(this.url + '/all');
  }

  getMoviePoster(movieTitle: string): Observable<string> {
    return this.http
      .get<any>(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          this.tmdbApiKey
        }&query=${encodeURIComponent(movieTitle)}`
      )
      .pipe(map((response: any) => response.results[0]?.poster_path));
  }

  updateMoviePoster(movie: Movie, posterUrl: string): Observable<Movie> {
    movie.posterUrl = posterUrl;

    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ posterUrl: posterUrl });
    return this.http
      .put<Movie>(`${this.url}/update/${movie.id}`, body, {
        headers: headers,
      })
      .pipe(
        map((updatedMovie) => updatedMovie),
        catchError((error) => throwError(error))
      );
  }

  getMoviesPage(page: number, pageSize: number): Observable<Page<Movie>> {
    return this.http.get<Page<Movie>>(`${this.url}/pages/${page}/${pageSize}`);
  }

  getUnseenMovies(): Observable<any> {
    return this.http.get(this.url + '/unseen');
  }
}
