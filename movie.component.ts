import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';

import { GenreCheckbox, Movie, MovieQuery, MovieState } from '../../model';
import { MovieService } from '../../services/movie.service';
import { genreCheckboxes } from '../../data/genre-checkboxes';

import { toSet } from '../../../core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent {
  readonly getQuery = (state: MovieQuery, action: Partial<MovieQuery>) => ({
    ...state,
    ...action
  });
  readonly genreCheckboxes = genreCheckboxes;
  // remove
  //selectedGenre: Genre[] = [];
  selectedItemsList: GenreCheckbox[] = [];

  // debugger
  readonly state$: Observable<MovieState> = this.mS.state$;
  readonly length$: Observable<number> = this.mS.state$.pipe(
    map(({ ids }) => ids.length)
  );

  readonly movies$: Observable<Movie[]> = this.mS.movies$;
  readonly movieQuery$: Observable<MovieQuery> = this.mS.movieQuery$;
  readonly pages$: Observable<number[]> = this.mS.pages$;

  constructor(readonly mS: MovieService) {}

  // manipulate(genre: Genre, isChecked: boolean) {
  //   // imperative
  //   this.selectedGenre = isChecked
  //     ? toSet([...this.selectedGenre, genre])
  //     : toSet(this.selectedGenre.filter(g => g !== genre));
  //   this.mS.genre$.next(this.selectedGenre);
  // }
  
  // remove
  changeSelection() {
    this.selectedItemsList = this.genreCheckboxes.filter((value, index) => {
      return value.isChecked;
    });
  }
}
