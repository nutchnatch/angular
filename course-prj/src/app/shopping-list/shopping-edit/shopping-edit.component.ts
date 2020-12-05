import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { from } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputReference: ElementRef;
  @ViewChild('amountInput') amountInputReference: ElementRef;
  ingredientAdded: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.ingredientAdded
    .subscribe(
      (ingredient: Ingredient) => {
        this.ingredientAdded = ingredient;
      }
    );
  }

  onAddItem(){
    const ingredientName = this.nameInputReference.nativeElement.value;
    const ingredientAccount = this.amountInputReference.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAccount);
    this.shoppingListService.addIngredient(newIngredient);
    this.shoppingListService.ingredientAdded.emit(newIngredient);
  }

}
