import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, map, switchMap, tap } from 'rxjs';
import { FillDbService } from '../services/fill-db.service';
@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css',
})
export class MoviePageComponent implements OnInit {
  movie$: Observable<Movie> = EMPTY;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private fillDb: FillDbService
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
        console.log(movie);
        return this.fillDb.getMoviePoster(movie.vo).pipe(map(() => movie));
      })
    );
  }
}
