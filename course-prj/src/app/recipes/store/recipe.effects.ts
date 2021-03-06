import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                // 'https://ng-course-recipe-book-e3086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token)
                    'https://ng-course-recipe-book-e3086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json');
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes)
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPE),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipeState]) => {
                return this.http.put(
                    'https://ng-course-recipe-book-e3086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
                    recipeState.recipes
                );
            })
        );

    constructor(
            private actions$: Actions,
            private http: HttpClient,
            private store: Store<fromApp.AppState>
        ) {}
}