import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.component.html',
  styleUrl: './to-see.component.css',
})
export class ToSeeComponent {
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
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
