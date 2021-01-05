import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from'@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root'})
export class DataStorageService {
    constructor(
            private http: HttpClient, 
            private store: Store<fromApp.AppState>
        ) {}

    storeRecipes() {
        // const recipes = this.recipeService.getRecipes();
        const recipes = [];
        this.http.put('https://ng-course-recipe-book-e3086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
                .subscribe(response => {
                    console.log(response);
                });
                
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
                // 'https://ng-course-recipe-book-e3086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token)
                    'https://ng-course-recipe-book-e3086-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
        }), tap(recipes => {
                this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                // this.recipeService.setRecipes(recipes);
            })
        ); 
    }
}