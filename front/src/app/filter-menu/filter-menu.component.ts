import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Genre } from '../models/genre.model';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrl: './filter-menu.component.css',
})
export class FilterMenuComponent {
  constructor(
    private eRef: ElementRef,
    private router: Router,
    private movieService: MoviesService
  ) {}

  toSeeGenres: Genre[] = [];

  userChoices: any = {
    filter: [],
    filterId: [],
    duration: '',
  };

  ngOnInit(): void {
    this.getToSeeGenres();
  }

  //Je transmets l'événement clickOutside
  @Output() clickOutside = new EventEmitter<void>();

  //Je crée la méthode pour fermer le menu si je clique en dehors
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (
      !this.eRef.nativeElement.contains(event.target) &&
      event.target.id !== 'filterButton'
    ) {
      this.clickOutside.emit();
    }
  }

  //Je récupère les valeurs du bouton cliqué
  setGenreFilter(field: string, value: string, id: number) {
    if (this.userChoices['filter'][0] === value) {
      this.userChoices = { ...this.userChoices, filter: [], filterId: [] };
    } else {
      this.userChoices = {
        ...this.userChoices,
        filter: [value],
        filterId: [id],
      };
      console.log(this.userChoices);
    }
  }

  setPrefFilter(field: string, value: string) {
    if (this.userChoices['filter'][0] === value) {
      this.userChoices = { ...this.userChoices, filter: [] };
    } else {
      this.userChoices = {
        ...this.userChoices,
        duration: [value],
      };
      console.log(this.userChoices);
    }
  }

  //J'ajoute dans un tableau les genres des films pas vus
  getToSeeGenres() {
    this.movieService.getUnseenMovies().subscribe(
      (data) => {
        this.toSeeGenres = data.map((movie: any) => {
          return movie.genre;
        });

        this.toSeeGenres = this.toSeeGenres.filter(
          (genre, index, self) =>
            index ===
            self.findIndex((t) => t.id === genre.id && t.name === genre.name)
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Je crée la méthode pour soumettre le formulaire
  onSubmit(): void {
    this.router.navigate(['/to-see/filtered'], {
      queryParams: {
        filterId: this.userChoices.filterId,
        filter: this.userChoices.filter,
        duration: this.userChoices.duration,
      },
    });
  }
}
