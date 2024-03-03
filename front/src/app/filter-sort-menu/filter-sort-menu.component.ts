import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-sort-menu',
  templateUrl: './filter-sort-menu.component.html',
  styleUrl: './filter-sort-menu.component.css',
})
export class FilterSortMenuComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  userChoices: any = {
    sort: [],
    filter: [],
  };

  //Je récupère les valeurs du bouton cliqué
  setPrefSort(field: string, value: string) {
    this.userChoices['sort'] = [value];
    console.log(field, value);
  }

  setPrefFilter(field: string, value: string) {
    this.userChoices['filter'] = [value];
    console.log(field, value);
  }

  // Je crée la méthode pour soumettre le formulaire
  onSubmit(): void {
    this.router.navigate(['/my-movies/filtered'], {
      queryParams: {
        sort: this.userChoices.sort,
        filter: this.userChoices.filter,
      },
    });
  }
}
