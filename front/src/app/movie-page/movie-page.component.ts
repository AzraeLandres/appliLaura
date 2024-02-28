import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css',
})
export class MoviePageComponent implements OnInit {
  movie: Movie = {} as Movie;
  movie$: Observable<Movie> = EMPTY;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.getId();
    if (id) {
      this.movie$ = this.getMovieById(+id);
    }
  }

  getId() {
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }

  getMovieById(id: number): Observable<Movie> {
    return this.moviesService.getMovieById(id).pipe(
      switchMap((movie) => {
        return this.moviesService.getMoviePoster(movie.vo).pipe(
          tap((posterUrl) => (movie.posterUrl = posterUrl)),
          map(() => movie)
        );
      })
    );
  }
}
