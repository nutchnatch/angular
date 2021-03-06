import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp  from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSubs: Subscription; 
    isAuthenticated = false;

    constructor(
            private store: Store<fromApp.AppState>
        ) {}

    ngOnInit() {
        this.userSubs = this.store.select('auth').pipe(
            map(authState => {
                return authState.user;
            }))
            .subscribe(user => {
                this.isAuthenticated = !!user;
                console.log(!user);
                console.log(!!user);
            });
    }

    onSaveData() {
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFectData() {
        // this.dataStorageService.fetchRecipes()
        //     .subscribe();
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    ngOnDestroy() {
        this.userSubs.unsubscribe();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}