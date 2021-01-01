import { NgModule } from "@angular/core";
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: "shopping-list", component: ShoppingListComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule {

}