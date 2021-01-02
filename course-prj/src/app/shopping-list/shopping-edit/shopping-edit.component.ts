import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store }  from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false })  slForm: NgForm;
  ingredientAdded: Ingredient;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
      private shoppingListService: ShoppingListService,
      private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit(): void {
    // this.shoppingListService.ingredientAdded
    // .subscribe(
    //   (ingredient: Ingredient) => {
    //     this.ingredientAdded = ingredient;
    //   }
    // ); 

    this.subscription = this.shoppingListService.startedEditing
        .subscribe(
          (index: number) => {
            this.editedItemIndex = index;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
        });
  }

  onSubmit(form: NgForm){
    const value = form.value;
    console.log(value)
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
    this.shoppingListService.ingredientAdded.next(newIngredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCLear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(index: number) {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onCLear();
  }
}
