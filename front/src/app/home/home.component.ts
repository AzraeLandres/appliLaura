import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';
import { from, filter, concatMap, toArray, tap, delay } from 'rxjs';
import { FillDbService } from '../services/fill-db.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private http: HttpClient,
    private fillDb: FillDbService
  ) {}

  posterUrl!: string;
  ngOnInit(): void {
    this.getMoviesByDateDesc();
    this.getLast3UnseenMovies();
  }

  // Méthode pour récupérer les 3 derniers films vus
  movies: Movie[] = [];
  getMoviesByDateDesc() {
    this.moviesService.getMoviesByDateDescTop3().subscribe(
      (data) => {
        this.movies = data;
        if (this.movies.some((movie) => movie.posterUrl === null)) {
          this.fillDatabase();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Méthode pour récupérer les 3 derniers films non vus

  unseenMovies: Movie[] = [];
  getLast3UnseenMovies() {
    this.moviesService.getLast3UnseenMovies().subscribe(
      (data) => {
        this.unseenMovies = data;
        if (this.unseenMovies.some((movie) => movie.posterUrl === null)) {
          this.fillDatabase();
        }
        console.log(this.unseenMovies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fillDatabase() {
    from(this.movies)
      .pipe(
        filter((movie) => movie.posterUrl === null),
        concatMap((movie) =>
          this.fillDb.getMoviePoster(movie.vo).pipe(
            filter((posterUrl) => !!posterUrl),
            tap((data) => {
              // Find the index of the movie in the movies array
              const index = this.movies.findIndex((m) => m.vo === movie.vo);
              // Update the movie in-place in the movies array
              this.movies[index] = { ...movie, posterUrl: data };
            })
          )
        ),
        toArray()
      )
      .subscribe();
  }
}
