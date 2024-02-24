import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ToSeeComponent } from './to-see/to-see.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { QuizComponent } from './quiz/quiz.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToSeeComponent,
    MyMoviesComponent,
    AddMovieComponent,
    QuizComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
