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
  moviesGenres: any = { genre: [], id: 0 };
  moviesDuration: any = { duration: '' };
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

  // Methode pour montrer tous les films pas vus
  getUnseenMovies() {
    this.movieService.getUnseenMovies().subscribe(
      (data) => {
        this.movies = data;
        console.log(this.movies);
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
    if (!params.has('filter')) {
      this.getUnseenMovies();
    } else if (params.has('filterId') && params.get('filterId') !== undefined) {
      console.log(params.get('filterId'));

      this.getMoviesByGenreId(Number(params.get('filterId')));
    } else if (params.has('duration')) {
      if (params.get('duration') === 'court') {
        this.getMoviesDuration('court');
      } else if (params.get('duration') === 'moyen') {
        this.getMoviesDuration('moyen');
      } else if (params.get('duration') === 'long') {
        this.getMoviesDuration('long');
      }
    }
  }

  //Méthode pour afficher les films non vu par genre
  getMoviesGenreId() {
    this.movieService.getUnseenMovies().subscribe(
      (data) => {
        this.moviesGenres = data.map((movie: any) => {
          return { genre: movie.genre.name, id: movie.genre.id };
        });

        console.log(this.moviesGenres);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMoviesByGenreId(id: number) {
    this.movieService.getUnseenMovies().subscribe(
      (data) => {
        this.movies = data.filter((movie: any) => {
          return movie.genre && movie.genre.id === id;
        });

        this.movies.forEach((movie) => {
          this.movieService.getMoviePoster(movie.vo).subscribe(
            (posterUrl) => (movie.posterUrl = posterUrl),
            (error) => console.log(error)
          );
        });
        console.log(id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Méthode pour afficher les films non vu par durée
  getMoviesDuration(duration: string) {
    this.movieService.getUnseenMovies().subscribe(
      (data) => {
        this.movies = data.filter((movie: any) => {
          if (duration === 'court') {
            return movie.duration < 90;
          } else if (duration === 'moyen') {
            return movie.duration > 90 && movie.duration < 120;
          } else if (duration === 'long') {
            return movie.duration > 120;
          } else {
            return movie;
          }
        });

        this.movies.forEach((movie) => {
          this.movieService.getMoviePoster(movie.vo).subscribe(
            (posterUrl) => (movie.posterUrl = posterUrl),
            (error) => console.log(error)
          );
        });
        console.log(duration);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
