import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { QuizComponent } from './quiz/quiz.component';
import { SearchComponent } from './search/search.component';
import { ToSeeComponent } from './to-see/to-see.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
   { path: 'home', component: HomeComponent }
  { path: 'to-see', component: ToSeeComponent },
  { path: 'my-movies', component: MyMoviesComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
