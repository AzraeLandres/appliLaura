import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-sort-menu',
  templateUrl: './filter-sort-menu.component.html',
  styleUrl: './filter-sort-menu.component.css',
})
export class FilterSortMenuComponent implements OnInit {
  constructor(private eRef: ElementRef, private router: Router) {}

  userChoices: any = {
    sort: [],
    filter: [],
  };

  ngOnInit(): void {}

  @Output() clickOutside = new EventEmitter<void>();

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
  setPrefSort(field: string, value: string) {
    if (this.userChoices['sort'][0] === value) {
      this.userChoices = { ...this.userChoices, sort: [] };
    } else {
      this.userChoices = { ...this.userChoices, sort: [value] };
    }
    console.log(this.userChoices['sort'][0]);
  }

  setPrefFilter(field: string, value: string) {
    if (this.userChoices['filter'][0] === value) {
      this.userChoices = { ...this.userChoices, filter: [] };
    } else {
      this.userChoices = { ...this.userChoices, filter: [value] };
    }
  }

  // Je crée la méthode pour naviguer vers la page filtered
  onSubmit(): void {
    this.router.navigate(['/to-see/filtered'], {
      queryParams: {
        sort: this.userChoices.sort,
        filter: this.userChoices.filter,
      },
    });
  }
}
