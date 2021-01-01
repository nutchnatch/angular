
import { NgModule } from "@angular/core";
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipesResolverService } from '../recipes/recipes-resolver.service';

const routes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent},
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]}
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}