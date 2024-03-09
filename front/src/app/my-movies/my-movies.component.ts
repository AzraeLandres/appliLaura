import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { FillDbService } from '../services/fill-db.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from, filter, concatMap, toArray, tap, delay } from 'rxjs';
@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.css',
})
export class MyMoviesComponent implements OnInit {
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private fillDbService: FillDbService
  ) {}

  movies: Movie[] = [];
  showFilters = false;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.getParsedUrl(params);
    });
  }

  ngOnDestroy() {
    this.route.queryParamMap.subscribe().unsubscribe();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    console.log(this.showFilters);
  }

  // Methode pour montrer tous les films
  getallMovies() {
    this.fillDbService.getAllMovies().subscribe((data: Movie[]) => {
      this.movies = data;
      if (data.filter((movie) => movie.seen === true)) {
        this.movies = data.filter((movie) => movie.seen === true);
      }

      if (this.movies.some((movie) => movie.posterUrl === null)) {
        this.fillDatabase();
      }
    });
  }

  fillDatabase() {
    from(this.movies)
      .pipe(
        filter((movie) => movie.posterUrl === null),
        concatMap((movie) =>
          this.fillDbService.getMoviePoster(movie.vo).pipe(
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
  // Récupération des paramètres de l'URL
  getParsedUrl(params: ParamMap) {
    console.log(params);
    if (!params.has('sort') && !params.has('filter')) {
      this.getallMovies();
    } else if (params.has('sort')) {
      if (params.get('sort') === 'order') {
        this.getMoviesByTitle();
      } else if (params.get('sort') === 'note') {
        this.getMoviesByNote();
      } else if (params.get('sort') === 'date') {
        this.getMoviesByDate();
      }
    }

    if (params.has('filter')) {
      if (params.get('filter') === 'beurk') {
        this.getBeurkMovies();
      }
      if (params.get('filter') === 'favoris') {
        this.getFavMovies();
      }
    }
  }

  // Methode pour montrer les films par genre
  getMoviesByGenreId(id: number) {
    this.movieService.getMoviesbyGenreId(id).subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Methode pour montrer les films par note
  getMoviesByNote() {
    this.movieService.getMoviesByNote().subscribe(
      (data) => {
        this.movies = data;

        console.log(this.movies);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Methode pour montrer les films par ordre alphabétique
  getMoviesByTitle() {
    this.movieService.getMoviesByOrder().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Methode pour montrer les films par date
  getMoviesByDate() {
    this.movieService.getMoviesByDateDesc().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour montrer films tag Beurk

  getBeurkMovies() {
    this.movieService.getMoviesByTag('Beurk').subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Méthode pour montrer films tag Favoris

  getFavMovies() {
    this.movieService.getMoviesByTag('Favoris').subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
