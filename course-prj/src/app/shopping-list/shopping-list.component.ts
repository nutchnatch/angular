import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  // private igChangeSub: Subscription;
   
  constructor(
      private loggingService: LoggingService,
      private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.igChangeSub = this.shoppingService.ingredientChanged
    // .subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printlog('Hello from ShoppinglistComponent ngOnInit');
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
