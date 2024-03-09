import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { FillDbService } from '../services/fill-db.service';
@Component({
  selector: 'app-to-see',
  templateUrl: './to-see.component.html',
  styleUrl: './to-see.component.css',
})
export class ToSeeComponent {
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private fillDbService: FillDbService
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
    this.fillDbService.getAllMovies().subscribe(
      (data) => {
        this.movies = data;
        if (data.filter((movie) => movie.seen !== true)) {
          this.movies = data.filter((movie) => movie.seen !== true);
        }

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
    this.fillDbService.getUnseenMovies().subscribe(
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
    this.fillDbService.getUnseenMovies().subscribe(
      (data) => {
        this.movies = data.filter((movie: any) => {
          return movie.genre && movie.genre.id === id;
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
    this.fillDbService.getUnseenMovies().subscribe(
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

        console.log(duration);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
