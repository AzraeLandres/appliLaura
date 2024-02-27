import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private moviesService: MoviesService, private http: HttpClient) {}

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
        this.movies.forEach((movie) => {
          this.moviesService.getMoviePoster(movie.vo).subscribe(
            (posterUrl) => (movie.posterUrl = posterUrl),
            (error) => console.log(error)
          );
        });
        console.log(this.movies);
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
        this.unseenMovies.forEach((movie) => {
          this.moviesService.getMoviePoster(movie.vo).subscribe(
            (posterUrl) => (movie.posterUrl = posterUrl),
            (error) => console.log(error)
          );
        });
        console.log(this.unseenMovies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour naviguer vers la page de détail d'un film
}
