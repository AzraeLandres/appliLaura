import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private url = 'https://dino-cine-back-15b7eabfff73.herokuapp.com/movies';
  private localUrl = 'http://localhost:8080/movies';
  private genreUrl = 'https://dino-cine-back-15b7eabfff73.herokuapp.com/genres';

  private tmdbApiKey = 'bfe71b7c7b147b1316508086f210ad2a';

  private movies: Movie[] = [];

  private movie = {} as Movie;
  constructor(private http: HttpClient) {}

  //Méthode pour chercher les posters des films
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

  //Méthode pour chercher tous les films
  getMovies() {
    return this.http.get<Movie[]>(this.url + '/all');
  }

  //Méthode pour afficher les films en ordre alphabétique
  getMoviesByOrder(): Observable<any> {
    return this.http.get(this.url + '/all/asc');
  }

  //Méthode pour chercher film par id
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(this.url + '/' + id);
  }

  //Méthode pour chercher les films par genre
  getMoviesbyGenreId(id: number): Observable<any> {
    return this.http.get(this.url + '/genre/' + id);
  }

  //Méthode pour chercher les films par date en affichant les 3 premiers
  getMoviesByDateDescTop3(): Observable<any> {
    return this.http.get(this.url + '/date/top3');
  }

  //Méthodes pour afficher les films pas vus
  getUnseenMovies(): Observable<any> {
    return this.http.get(this.url + '/unseen');
  }

  //Méthode pour afficher les 3 derniers films pas vus
  getLast3UnseenMovies(): Observable<any> {
    return this.http.get(this.url + '/unseen/last3');
  }

  //Méthode pour afficher les films par note
  getMoviesByNote(): Observable<any> {
    return this.http.get(this.url + '/rating/desc');
  }

  //Méthode pour afficher films par date

  getMoviesByDateDesc(): Observable<any> {
    return this.http.get(this.url + '/date/desc');
  }

  //Méthode pour avoir movie par tag
  getMoviesByTag(tag: string): Observable<any> {
    return this.http.get(this.url + '/tag/' + tag);
  }

  //Méthode pour avoir tous les genres
  getGenres(): Observable<any> {
    return this.http.get(this.genreUrl);
  }
}
