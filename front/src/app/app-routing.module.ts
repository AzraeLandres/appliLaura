import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { QuizComponent } from './quiz/quiz.component';
import { SearchComponent } from './search/search.component';
import { ToSeeComponent } from './to-see/to-see.component';
import { HomeComponent } from './home/home.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'to-see', component: ToSeeComponent },
  { path: 'to-see/filtered', component: ToSeeComponent },
  { path: 'my-movies', component: MyMoviesComponent },
  { path: 'my-movies/filtered', component: MyMoviesComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
