import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
   
  constructor(private shoppingService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.ingredientChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.loggingService.printlog('Hello from ShoppinglistComponent ngOnInit');
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    console.log(index)
    this.shoppingService.startedEditing.next(index);
  }
}
