import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrl: './my-movies.component.css',
})
export class MyMoviesComponent implements OnInit {
  constructor(
    private movieService: MoviesService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  movies: Movie[] = [];
  showFilters = false;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.getParsedUrl(params);
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    console.log(this.showFilters);
  }

  // Methode pour montrer tous les films
  getallMovies() {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        this.movies.forEach((movie) => {
          this.movieService.getMoviePoster(movie.vo).subscribe(
            (posterUrl) => (movie.posterUrl = posterUrl),
            (error) => console.log(error)
          );
        });

        return this.movies;
      },
      (error) => {
        console.log(error);
      }
    );
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

    // toggle le menu de filtres
    this.toggleFilters();
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

  // Methode pour montrer les films par note
  getMoviesByNote() {
    this.movieService.getMoviesByNote().subscribe(
      (data) => {
        this.movies = data;
        this.movies.forEach((movie) => {
          this.movieService.getMoviePoster(movie.vo).subscribe(
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

  // Methode pour montrer les films par ordre alphabétique
  getMoviesByTitle() {
    this.movieService.getMoviesByOrder().subscribe(
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

  // Methode pour montrer les films par date
  getMoviesByDate() {
    this.movieService.getMoviesByDateDesc().subscribe(
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

  // Méthode pour montrer films tag Beurk

  getBeurkMovies() {
    this.movieService.getMoviesByTag('Beurk').subscribe(
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

  // Méthode pour montrer films tag Favoris

  getFavMovies() {
    this.movieService.getMoviesByTag('Favoris').subscribe(
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
