import  { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageSerice: DataStorageService,
                private recipeService: RecipeService,
                private store: Store<fromApp.AppState>,
                private actions$: Actions
            ){};
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new RecipesActions.FetchRecipes());
        return this.actions$.pipe(
                ofType(RecipesActions.SET_RECIPES),
                take(1));
        // const recipes = this.recipeService.getRecipes();
        // if(recipes.length === 0) {
        //     return this.dataStorageSerice.fetchRecipes();
        // } else {
        //     return recipes;
        // }
    }
}