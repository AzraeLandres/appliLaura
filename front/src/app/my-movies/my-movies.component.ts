import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.css',
})
export class MyMoviesComponent implements OnInit {
  constructor(private movieService: MoviesService, private http: HttpClient) {}
  movies: Movie[] = [];
  showFilters = false;

  ngOnInit(): void {
    this.getallMovies();
  }
  // Methode pour montrer tous les films
  getallMovies() {
    const storedMovies = localStorage.getItem('movies');

    if (storedMovies?.length === 0) {
      this.movies = JSON.parse(storedMovies);
    } else {
      this.movieService.getMovies().subscribe(
        (data) => {
          this.movies = data;
          this.movies.forEach((movie) => {
            this.movieService.getMoviePoster(movie.vo).subscribe(
              (posterUrl) => (movie.posterUrl = posterUrl),
              (error) => console.log(error)
            );
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  // Methode pour montrer les films par genre
  getMoviesByGenreId(id: number) {
    this.movieService.getMoviesbyGenreId(id).subscribe(
      (data) => {
        this.movies = data;
        this.movies.forEach((movie) => {
          this.movieService.getMoviePoster(movie.vo).subscribe(
            (posterUrl) => (movie.posterUrl = posterUrl),
            (error) => console.log(error)
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
